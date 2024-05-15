<script lang="ts">

 
  import type { PageData } from './$types';
  import { page } from "$app/stores"

 
  
  export let data: PageData;
const formatter = new Intl.NumberFormat('en-US', {
style: 'currency',
currency: 'USD',

});

</script>



{#if data.returnArr.length > 0  } 
<h1 class="text-3xl text-center py-8">{data.stockInfoArr[0].name}</h1>

<div class=" max-w-2xl max-h-[500px] overflow-y-auto pt-4 mx-auto mb-20">
        <table class="table  mx-auto">
            <!-- head -->
            <thead>
              <tr>
                <th>Delete</th>
                <th>Ticker</th>
                <th>Shares</th>
                <th>Cost</th>
                <th class="hidden sm:table-cell">Date Purchased</th>
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
                  <td >{formatter.format(Number(stock?.numShares * Number(stock?.costPerShare)))}</td>
                  <td  class="hidden sm:table-cell">{stock.buyDate.toLocaleDateString("en-US")}</td>

                </tr>
                {:else}
                <p>no data found </p>
                {/if}
              {/each}
            </tbody>
          </table>
    
</div>
<div class="max-w-4xl mx-3 sm:mx-auto flex flex-col sm:flex-row flex-wrap justify-evenly bg-slate-800 rounded-md mb-10">
  <div class="py-8 mx-auto">

    {#if data.totalReturn >= 0}
    <h3 class="sm:text-2xl ">Total { data.returnArr[0].ticker} Return: <span class=" bg-slate-100/5 p-6 text-[#16A34A] font-semibold"> +{formatter.format(data.totalReturn)}</span></h3>

    {:else}
    <h3 class="sm:text-2xl ">Total { data.returnArr[0].ticker} Return: <span class="text-[#dc2626]  font-semibold"> {formatter.format(data.totalReturn)}</span></h3>

  {/if}
  </div>
  <div class="mb-10 mx-auto">
    <h2 class="text-2xl">Company profile:</h2>

    <p class="px-3 my-3">Industry: {data.stockInfoArr[0].industry}</p>
    <p class="px-3 my-3">Sector: {data.stockInfoArr[0].sector}</p>
    <a class="px-3 my-3" href={data.stockInfoArr[0].website} target="_blank" >Website: {data.stockInfoArr[0].website}</a>
  </div>
  <div class="border-t">
    <h3 class="text-center text-2xl pt-2 font-semibold">Compnay Decription: </h3>
  <p class="mb-8 text-lg max-h-[320px] overflow-y-auto leading-8 p-6">{data.stockInfoArr[0].desc}</p>
  </div>
  
</div>


{:else}
<h1 class="text-3xl text-center py-8">No {$page.params.stock} stock found</h1>
{/if}




