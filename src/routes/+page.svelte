<script lang="ts">
    import {goto} from "$app/navigation" 

</script>
<div class="hero">
    <div class="hero-content max-w-full flex-col lg:flex-row lg:items-end gap-10 my-3 border-b-2 border-spacing-8">
      <img src="/stonkMeme.jpg" class="rounded-lg shadow-2xl" alt="stonk meme"/>
        <div class="max-w-lg">
            <h1 class="text-5xl font-bold">Stock Value Tracker!</h1>
            <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button on:click={()=> {goto('/auth/signup')}} class="btn btn-success h-[unset] px-8 py-5 hover:text-gray-light">Get Started</button>
      </div>
    </div>
</div>
<h2 class="text-5xl text-center my-16">Keep all of your trades in one place</h2>
<div class="max-w-2xl p-8 mx-3 sm:mx-auto text-2xl rounded-lg shadow-2xl shadow-stone-300">
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus magni ipsum sunt qui similique nihil eligendi autem expedita. Doloremque distinctio eum sit eaque aliquid blanditiis itaque maxime explicabo, neque cumque!</p>
</div>
<div class="max-w-4xl flex gap-10 mx-auto my-24">
  <div class="card lg:card-side  shadow-2xl mx-auto shadow-stone-300">
    <figure><img src="/stockgraph.jpg" alt="stock graph"/></figure>
    <div class="card-body">
      <h2 class="card-title">Track all your Purchases!</h2>
      <ul class="my-4 gap-2 pl-3 list-inside">
        <li>Calculate your returns automatically</li>
        <li>Track your average Price to Earnings Ratio</li>
      </ul>
    </div>
  </div>
</div>