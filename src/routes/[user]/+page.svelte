<script lang="ts">

	  import { enhance } from "$app/forms";
    import type { PageData } from './$types';

   
    
   export let data: PageData;
  //  console.log(data.user?.username)

  //  console.log(data.displayData)
   const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
</script>
<h1 class="text-3xl text-center p-6">{data.user?.username}'s Dashboard</h1>
<!-- <h1>{data.res[6].ticker}</h1> -->

<div class="mx-2 overflow-x-hidden min-h-[80vh]">
  {#if data.displayData.length > 0}
    <div class="mx-auto max-h-[500px] overflow-y-scroll max-w-3xl">
      <table class="table max-w-2xl mx-auto ">
        <!-- head -->
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Shares</th>
            <th>Cost</th>
            <th class="sm:table-cell">value</th>
            <th class="hidden sm:table-cell">Average P/E</th>
            <th class="hidden sm:table-cell">Return</th>
          </tr>
        </thead>
        <tbody>
          {#each data.displayData as stock} 
          {#if stock}
            <tr class="hover">
              <th>
                <a href={`/${data.user?.username}/${stock.ticker}`}>
                  {stock?.ticker}
                </a>
              </th>
              <td class="py-5">{stock?.info.numShares}</td>
              <td>{formatter.format(Number(stock?.info.totalCost))}</td>
              <td>{formatter.format(Number(stock?.info.numShares * stock?.info.quote))}</td>
              <td class="hidden sm:table-cell">{stock?.info.averagePE}</td>
                {#if (stock?.info.numShares * stock?.info.quote) - stock?.info.totalCost < 0}
                  <td class="hidden text-[#dc2626] sm:table-cell">{formatter.format((stock?.info.numShares * stock?.info.quote) - stock?.info.totalCost)}</td>  
                  {:else}
                  <td class="hidden text-[#16A34A] sm:table-cell">+{formatter.format((stock?.info.numShares * stock?.info.quote) - stock?.info.totalCost)}</td> 

                {/if}
            </tr>
            {:else}
            <p>no data found </p>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <p class="text-lg text-center">No buy info has been added yet</p>
  {/if} 
     
      
    
 
   <!-- Open the modal using ID.showModal() method -->
   <div class="max-w-2xl mx-auto">
    <button class="btn btn-success btn-outline mt-4 " onclick="my_modal_5.showModal()">New Buy</button>
    <dialog id="my_modal_5" class="modal sm:modal-middle">
      <div class="modal-box">
        <form method="dialog" class="ml-auto text-end">
          <button  class="btn btn-outline btn-error text-end">Close</button>
        </form> 
        <form method="POST" use:enhance class=" flex flex-col p-6 gap-3">
         
          <label class="input input-bordered flex items-center gap-2">
            <input type="text" class="grow" name="ticker" placeholder="Ticker" />
          </label>
          <label class="input input-bordered flex items-center gap-2">
            <input type="number" class="grow" name="numShares" placeholder="Number of Shares" />
          </label>
          <label class="input input-bordered flex items-center gap-2">
            <input type="date" class="grow" name="buyDate" placeholder="Purchase Date" />
          </label>
          <label class="input input-bordered flex items-center gap-2">
            <input type="number" step=".01" class="grow" name="costPerShare" placeholder="Cost Per Share" />
          </label>
          <button class="btn btn-primary">submit</button>
        </form>
      </div>
      
        
    
      
    </dialog>
   </div>
  
   
 


  
</div>


