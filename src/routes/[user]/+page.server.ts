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
				numShares: number,
				quote: number,
				
			}
		}

	let displayData: [DisplayData?] = [];

	
	const getData = async (ticker:string, date:Date) => {
		const res = await fetch (`https://financialmodelingprep.com/api/v3/income-statement/${ticker}?period=quarter&apikey=${API_KEY}`);
		const data = await res.json()
		const dataLength = data.length -1;

		for (let i = 0; i <= dataLength; i++ ){
			const reportFileDate = new Date(data[i].date);
			const dateDifference =  reportFileDate.getTime() - date.getTime();
			const dateDifferenceInDays = Math.abs(Math.floor(dateDifference / (1000 * 60 * 60 * 24)));

			// if date has not happened yet, use last years form
			if(reportFileDate < date &&  i == 0){

				let ttmEarnings:number = Number(data[i].eps + data[i+1].eps+ data[i+2].eps+ data[i+3].eps);
				let ttmEbitda:number = Number(data[i].ebitda + data[i+1].ebitda+ data[i+2].ebitda+ data[i+3].ebitda)
				return {
					message: "data hasn't been reported yet, pervious TTM  Data",
					eps: ttmEarnings,
					ebitda: ttmEbitda

				}
			}
			if(reportFileDate > date && dateDifferenceInDays < 95){
				//Correct Data
				let ttmEarnings:number = Number(data[i].eps + data[i+1].eps+ data[i+2].eps+ data[i+3].eps)
				let ttmEbitda:number = Number(data[i].ebitda + data[i+1].ebitda+ data[i+2].ebitda+ data[i+3].ebitda)

				return {
					message: "success",
					eps: ttmEarnings,
					ebitda: ttmEbitda
				}

			}
		}
		return {
			error: "data only goes back 5 years",
			eps: 0,
			ebitda: 0
		}
	}



	 
	const calcPE = (costPerShare:number, eps:number, ) => {
		let pe = costPerShare/eps
		if (pe < 0){
			return 0;
		}
		return pe;
	}

	let totalReturn = 0
	for (let i =0; i< res.length;i++){
		// Get Stock Quote

		

		const currentTicker = res[i].ticker;
		const costPerShare = Number(res[i].costPerShare);
		const numShares = res[i].numShares
		const date = res[i].buyDate;
		const localTotalCost = costPerShare * numShares;

		const quoteRes = await fetch (`https://financialmodelingprep.com/api/v3/quote/${currentTicker}?apikey=${API_KEY}`);
		const quoteData = await quoteRes.json()

		const quote = quoteData[0].price
		

		const incomeData = await getData(res[i].ticker, date);

		
		let pe = calcPE( costPerShare, incomeData.eps,);
		
		let locationInArray= displayData.findIndex(obj => obj?.ticker == currentTicker)
		
		if(locationInArray == -1){
			if (!isFinite(pe)) {
				pe = 0
			}
			displayData.push({ticker: currentTicker,  info: {
				pe: pe,
				averagePE: parseFloat(pe.toFixed(2)),
				totalCost: localTotalCost,
				numShares: numShares,
				quote: quote,
			}})
		} 
			// ensure there is a defined object then update values
		if (displayData[locationInArray]) {
			
			const updateInfo = displayData[locationInArray].info
			updateInfo.numShares += numShares;
			updateInfo.totalCost = (updateInfo.totalCost += localTotalCost)
			if (pe<=0 || !isFinite(pe)){
				continue;
			}
			updateInfo.averagePE =  parseFloat((((updateInfo.averagePE * (updateInfo.numShares - numShares)) + (pe * numShares)) / updateInfo.numShares).toFixed(2));
		}
			
		totalReturn += (quote * numShares) - localTotalCost;
	}
	
	return {displayData, totalReturn}
	
	
	
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
		const numShares = Math.abs(Number(formdata.get("numShares")));
		const buyDate = formdata.get("buyDate")?.toString();
		let costPerShare = formdata.get("costPerShare");
		let tickerUpperCase = "" + ticker;
		// Ensure ticker is all caps
		tickerUpperCase = tickerUpperCase.toUpperCase();
		
		
		// Return Error if Symbol is not found
		if (!tickerUpperCase) {
			console.log("Ticker fail")
			return fail(400, {
				message: "Invalid Ticker"
			});
			
		}
		const tickerRes = await fetch (`https://financialmodelingprep.com/api/v3/quote/${tickerUpperCase}?apikey=${API_KEY}`);
		const tickerData = await tickerRes.json()
		if(!tickerData[0]) {
			console.log("fail")
			return fail(400, {
				message: "Invalid Ticker"
			})
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
		if (!costPerShare || !/^\d+(\.\d{1,2})?$/.test(costPerShare.toString())) {
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

		if(date > new Date()) {
			return fail(400, {
				message: "That date has not happened yet"
			})
		}

		let cikNumber = "0000333333"
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