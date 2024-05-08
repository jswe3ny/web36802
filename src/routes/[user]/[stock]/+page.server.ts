import { fail,redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from "./$types";
import {db} from "$lib/server/db";
import { buyTable } from '$lib/server/schema';
import { desc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, params}) => {
   
	// Redirect if No User 
	// Check later if locals.user is secure enough
	if (!locals.user) {
		redirect(307, '/auth/login');
	}
    let returnArr = []
   
        
         // load data for user and return ratios
        let res = await db.query.buyTable.findMany({
            where: eq(buyTable.ticker, params.stock),
            orderBy: [desc(buyTable.buyDate)]
            }) 
            if(!res) {
                redirect(307,`/${locals.user.username}`)
            }

            // const returnArr = res
           
            for(let i=0; i < res.length; i++) {
                if (res[i].userId == locals.user.id){
                    returnArr.push(res[i])
                }
            }
            // // console.log(returnArr)

            return {returnArr}
   

  

	




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
        console.log(res)
        // console.log(params.)
    }

}