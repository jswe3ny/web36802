<script lang="ts">
    import {goto} from "$app/navigation" 

</script>
<div class="hero">
    <div class="hero-content max-w-full flex-col lg:flex-row lg:items-end gap-10">
      <img src="/stonkMeme.jpg" class="rounded-lg shadow-2xl opacity-70" alt="stonk meme"/>
        <div class="max-w-lg">
            <h1 class="text-5xl font-bold">Stock Value Tracker!</h1>
            <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button on:click={()=> {goto('/auth/signup')}} class="btn btn-success h-[unset] px-8 py-5 hover:text-gray-light">Get Started</button>
      </div>
    </div>
</div>
<div class="max-w-4xl flex gap-10 mx-auto mt-24 ">
 
</div>