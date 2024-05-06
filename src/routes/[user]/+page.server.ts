import { fail,redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from "./$types";
import {db} from "$lib/server/db";
import { buyTable, userTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import { API_KEY } from '$env/static/private';


export const load: PageServerLoad = async ({ locals }) => {
	// Redirect if No User 
	// Check later if locals.user is secure enough
	if (!locals.user) {
		redirect(307, '/auth/login');
	}

	// load data for user and return ratios
	const res = await db.query.buyTable.findMany({
		where: eq(buyTable.userId, locals.user.id)
	})

	type DisplayData = {
			ticker: string,
			info: {
				pe:number,
				averagePE: number,
				totalCost: number,
				numShares: number
			}
		}

	let displayData: [DisplayData?] = [];

	
	const getEPS = async (ticker:string, date:Date) => {
		const res = await fetch (`https://financialmodelingprep.com/api/v3/income-statement/${ticker}?period=annual&apikey=${API_KEY}`);
		const data = await res.json()
		const dataLength = data.length -1;

		// console.log(data[0].eps)
		for (let i = 0; i <= dataLength; i++ ){
			// console.log(data[i].date)
			// Check if date is out of bounds
			const reportFileDate = new Date(data[i].date);
			const dateDifference =  reportFileDate.getTime() - date.getTime();
			const dateDifferenceInDays = Math.floor(dateDifference / (1000 * 60 * 60 * 24));

			// if date has not happened yet, use last years form
			if(reportFileDate < date &&  i == dataLength-1){
				console.log(data[i].symbol +" that data hasnt been released, using last years data. EPS: " + data[i-1].eps)
				return {
					message: "data hasn't been reported yet, using last years numbers",
					eps: Number(data[i-1].eps)
				}
			}
			if(reportFileDate > date && dateDifferenceInDays < 362){
				//Correct Data
			
				return {
					message: "success",
					eps: Number(data[i].eps)
				}

			}
		}
		// console.log("data only goes back 5 years")
		return {
			error: "data only goes back 5 years",
			eps: 0
		}
	}

	// const test = await getEPS(ticker, date);
	 
	const calcPE = (costPerShare:number, eps:number, ) => {
		let pe = costPerShare/eps
		if (pe < 0){
			return 0;
		}
		return pe;
	}

	for (let i =0; i< res.length;i++){

		const currentTicker = res[i].ticker;
		const costPerShare = Number(res[i].costPerShare);
		const numShares = res[i].numShares
		const date = res[i].buyDate;
		const localTotalCost = costPerShare * numShares;

		const eps = await getEPS(res[i].ticker, date);
		let pe = calcPE( costPerShare, eps.eps,);
		
		

		let locationInArray= displayData.findIndex(obj => obj?.ticker == currentTicker)
		// console.log(locationInArray)

		if(locationInArray == -1){
			// console.log("pushing " + currentTicker)
			if (!isFinite(pe)) {
				pe = 0
			}
			displayData.push({ticker: currentTicker, info: {
				pe: pe,
				averagePE: parseFloat(pe.toFixed(2)),
				totalCost: localTotalCost,
				numShares: numShares
			}})
		} 
			// ensure there is a defined object then update values
		if (displayData[locationInArray]) {
			if (pe<=0 || !isFinite(pe)){
				continue;
			}
			const updateInfo = displayData[locationInArray].info
			displayData[locationInArray].info.numShares += numShares;
			displayData[locationInArray].info.totalCost = (updateInfo.totalCost += localTotalCost)
			displayData[locationInArray].info.averagePE =  parseFloat((((updateInfo.averagePE * (updateInfo.numShares - numShares)) + (pe * numShares)) / updateInfo.numShares).toFixed(2));

		}
			
		
	}
	
	return {displayData}
	
	
	
};

// Add buy to database

export const actions: Actions = {
	default: async (event) => {
		if(!event.locals.user){
			redirect(307, '/auth/login');
		}
		const formdata = await event.request.formData();
		// get form values
		let ticker = formdata.get("ticker");
		const numShares = Number(formdata.get("numShares"));
		const buyDate = formdata.get("buyDate")?.toString();
		let costPerShare = formdata.get("costPerShare");
		let tickerUpperCase = "" + ticker;

		// Ensure ticker is all caps
		tickerUpperCase = tickerUpperCase.toUpperCase();

		let request = await fetch("https://www.sec.gov/files/company_tickers.json");
		let cik = await request.json()
		let cikNumber="";
		
		//Search for CIK number and Return with 10 digits, adds leading zeros if necessary
		for(let i=0; i < Object.keys(cik).length; i++) {
			// console.log(cik[i].ticker)
			if (cik[i].ticker == tickerUpperCase) {
				cikNumber += cik[i].cik_str;
				console.log(cik[i])
				while (cikNumber.length < 10) {
					cikNumber = "0" + cikNumber;
				}
				break;
			}
		}		
		// Return Error if Symbol is not found
		if (!cikNumber) {
			console.log("Ticker fail")
			return fail(400, {
				message: "Invalid Ticker"
			});
			
		}

		// Validate numShares is number
		if (!numShares || typeof numShares !== "number") {
			console.log("numshares fail") 
			return fail(400, {
				message: "Invalid number of shares"
			})
		}

		// ValiDATE
		
		// Validate price per share 
		if (!costPerShare || !/^-?\d+(\.\d{1,2})?$/.test(costPerShare.toString())) {
			console.log("fail cost per share")
			return fail(400, {
				message: "Invalid cost per share"
			})
		}

		if(!buyDate){
			return fail(400,{
				message:"no date"
			})
		}

		
		costPerShare = costPerShare.toString()
		const date: Date = new Date(buyDate)
		// ##Issue was improper typing##

		await db.insert(buyTable).values({
			userId: event.locals.user.id,
			ticker: tickerUpperCase,
			numShares: numShares,
			buyDate: date,
			cik: cikNumber,
			costPerShare: costPerShare,
		})
	}
}