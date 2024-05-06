<script lang="ts">

	  import { enhance } from "$app/forms";
    import type { PageData } from './$types';

    
   export let data: PageData;

   console.log(data.displayData)

</script>
<h1 class="text-3xl text-center p-6">{data.user?.username}'s Dashboard</h1>
<!-- <h1>{data.res[6].ticker}</h1> -->

<div class="mx-4 overflow-x-auto min-h-[80vh]">
  {#if data.displayData.length > 0}
    <div class="mx-auto max-h-[400px] overflow-y-scroll max-w-3xl">
      <table class="table max-w-2xl mx-auto ">
        <!-- head -->
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Shares</th>
            <th>Value</th>
            <th class="hidden sm:table-cell">Average P/E</th>
            <th class="hidden sm:table-cell">Return</th>
          </tr>
        </thead>
        <tbody>
          {#each data.displayData as stock} 
            <tr class="hover">
              <th>{stock?.ticker}</th>
              <td class="py-5">{stock?.info.numShares}</td>
              <td>{stock?.info.totalCost}</td>
              <td class="hidden sm:table-cell">{stock?.info.averagePE}</td>
              <td class="hidden sm:table-cell">Test</td>  
            </tr>
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
        
      <form method="post" use:enhance class=" modal-box flex flex-col p-6 gap-3">
        <form method="dialog" class="ml-auto">
          <!-- if there is a button in form, it will close the modal -->
          <button  class="btn btn-outline btn-error text-end">Close</button>
        </form>
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
        
    
      
    </dialog>
   </div>
  
   
 


  
</div>


