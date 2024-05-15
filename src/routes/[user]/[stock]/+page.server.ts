import { fail,redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from "./$types";
import {db} from "$lib/server/db";
import { buyTable } from '$lib/server/schema';
import { desc, eq } from 'drizzle-orm';
import { API_KEY } from '$env/static/private';


export const load: PageServerLoad = async ({ locals, params}) => {
   
	// Redirect if No User 
	// Check later if locals.user is secure enough
	if (!locals.user) {
		redirect(307, '/auth/login');
	}
    let stockInfoArr = [];
    const stockInfoRes = await fetch(`https://financialmodelingprep.com/api/v3/profile/${params.stock}?apikey=${API_KEY}`)
    const data = await stockInfoRes.json();

    const stock = data[0];
    stockInfoArr.push({
        currentPrice: stock.price,
        industry: stock.industry,
        name: stock.companyName,
        sector: stock.sector,
        website: stock.website,
        desc: stock.description
    })



    let returnArr = [];    
         // load data for user and return ratios
        let res = await db.query.buyTable.findMany({
            where: eq(buyTable.ticker, params.stock),
            orderBy: [desc(buyTable.buyDate)]
            }) 
            if(!res) {
                redirect(307,`/${locals.user.username}`)
            }

            // const returnArr = res
            let totalReturn = 0
            for(let i=0; i < res.length; i++) {
                if (res[i].userId == locals.user.id){
                    totalReturn +=  stock.price * res[i].numShares - (Number(res[i].costPerShare) * res[i].numShares) 
                    returnArr.push(res[i])
                }
            }
            console.log(totalReturn)

            return {returnArr, stockInfoArr, totalReturn}
   

  

	




}

export const actions: Actions = {
	default: async ({request, params, }) => {
        const formdata = await request.formData();
        const buyId = formdata.get("btn")?.toString()
        if (!buyId){
            return fail(407, {
                message: "could not delete"
            })
        }
        const res = await db.delete(buyTable).where(
            eq(buyTable.id, buyId)
        )
    }

}