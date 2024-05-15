<script lang="ts">

  import { enhance } from "$app/forms";
	import { param } from "drizzle-orm";
  import type { PageData } from './$types';
import {page } from "$app/stores"

 
  
 export let data: PageData;

const formatter = new Intl.NumberFormat('en-US', {
style: 'currency',
currency: 'USD',

});
// console.log(data.returnArr.buyDate)
</script>
{#if data.returnArr.length > 0  } 
<h1 class="text-3xl text-center py-8">{$page.params.stock}</h1>
<div class=" max-w-2xl max-h-[500px] overflow-y-scroll pt-4 mx-auto">

        <table class="table  mx-auto">
            <!-- head -->
            <thead>
              <tr>
                <th>Delete</th>
                <th>Ticker</th>
                <th>Shares</th>
                <th>Cost</th>
                <th class="hidden sm:table-cell">Date Purchased</th>
                <!-- <th class="hidden sm:table-cell"></th> -->
              </tr>
            </thead>
            <tbody>
                {#each data.returnArr as stock} 
              {#if stock}
                <tr class="hover">
                <th>
                    <form method="POST">
                        <button value={stock.id} name="btn" on:click={(e) => {console.log(stock.id)}} class="btn btn-square btn-sm btn-error btn-outline">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </form>
                </th>
                  <td class="p-6">
                    {stock.ticker}
                  </td>
                  <td class="py-5">{stock.numShares}</td>
                  <td>{formatter.format(Number(stock?.numShares * Number(stock?.costPerShare)))}</td>
                  <td>{stock.buyDate.toLocaleDateString("en-US")}</td>

                </tr>
                {:else}
                <p>no data found </p>
                {/if}
              {/each}
            </tbody>
          </table>
    
</div>
{:else}
<h1 class="text-3xl text-center py-8">No {$page.params.stock} stock found</h1>
{/if}
