<script lang="ts">

  import { enhance } from "$app/forms";
  import type { ActionData, PageData } from './$types';

 
  
 export let data: PageData;
 export let form: ActionData
 let totalReturn = 0;
//  console.log(form)

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
<details class="dropdown ">
  <summary class="m-1 btn btn-ghost hover:bg-transparent hover:rotate-45">    
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
    </summary>
       <div class="form-control w-[200px] absolute bg-gray-dark z-50 p-6 rounded-md">
        <label class="label cursor-pointer ">
          <span class="label-text pr-7">Average P/E</span> 
          <input type="checkbox" class="checkbox checkbox-primary" />
        </label>
        <label class="label cursor-pointer">
          <span class="label-text">Average P/B</span> 
          <input type="checkbox" class="checkbox checkbox-primary" />
        </label>
        <label class="label cursor-pointer">
          <span class="label-text">Average EV/EBITA</span> 
          <input type="checkbox" class="checkbox checkbox-primary" />
        </label>
      </div>
</details>

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
          <!-- <th class="hidden sm:table-cell">Average P/B</th> -->
          <!-- <th class="hidden sm:table-cell">Average EV/EBITDA</th> -->
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
            <!-- <td class="hidden sm:table-cell">{stock?.info.averagePB}</td> -->
            <!-- <td class="hidden sm:table-cell">{stock?.info.averageEvToEbitda}</td> -->

              <!-- {totalReturn+=(stock?.info.numShares * stock?.info.quote) - stock?.info.totalCost} -->
              
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
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{totalReturn}</td>
        </tr>
      </tbody>
    </table>
  </div>
{:else}
  <p class="text-lg text-center">No buy info has been added yet</p>
{/if} 
   
    
  

 <!-- Open the modal using ID.showModal() method -->
 <div class="max-w-2xl mx-auto">
  <button class="btn btn-success btn-outline mt-4 " onclick="my_modal_5.showModal()">New Buy</button>
  <dialog id="my_modal_5" class="modal sm:modal-middle z-10">
    {#if form?.message}
  <div class="toast">
    <div class="alert alert-info bg-error font-semibold z-30 ">
      <span >Error: {form.message}</span>
    </div>
    </div>
  {/if}
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

 <!-- Open the modal using ID.showModal() method -->
 <div class="max-w-2xl mx-auto">
  <button class="btn btn-ghost mt-4 hover:bg-transparent hover:rotate-45" onclick="settingsModal.showModal()">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
</button>
  <dialog id="settingsModal" class="modal sm:modal-middle z-10">
    {#if form?.message}
  <div class="toast">
    <div class="alert alert-info bg-error font-semibold z-30 ">
      <span >Error: {form.message}</span>
    </div>
    </div>
  {/if}
    <div class="modal-box">
      <form method="dialog" class="ml-auto text-end">
        <button  class="btn btn-outline btn-error text-end">Close</button>
      </form> 
      <div class="form-control  p-6 rounded-md">
        <label class="label cursor-pointer ">
          <span class="label-text pr-7">Average P/E</span> 
          <input type="checkbox" name="PE"class="checkbox checkbox-primary" />
        </label>
        <label class="label cursor-pointer">
          <span class="label-text">Average P/B</span> 
          <input type="checkbox" name="PB" class="checkbox checkbox-primary" />
        </label>
        <label class="label cursor-pointer">
          <span class="label-text">Average EV/EBITA</span> 
          <input type="checkbox" name="EVEBITA" class="checkbox checkbox-primary" />
        </label>
      </div>
    </div>
    "ebitda": 30,736,000,000,
    "ebitdaratio": 0.3386775093,
    "ebitda": 125,820,000,000,
    "ebitdaratio": 0.3282674772,

    
      
  
    
  </dialog>
 </div>
 

 




</div>


