import { c as create_ssr_component } from "../../chunks/ssr.js";
import "../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="hero"><div class="hero-content max-w-full flex-col lg:flex-row lg:items-end gap-10"><img src="/stonkMeme.jpg" class="rounded-lg shadow-2xl opacity-70" alt="stonk meme"> <div class="max-w-lg"><h1 class="text-5xl font-bold" data-svelte-h="svelte-esy6n1">Stock Value Tracker!</h1> <p class="py-6" data-svelte-h="svelte-9oep2d">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> <button class="btn btn-success h-[unset] px-8 py-5 hover:text-gray-light" data-svelte-h="svelte-1wowmd0">Get Started</button></div></div></div> <div class="max-w-4xl flex gap-10 mx-auto mt-24 " data-svelte-h="svelte-1m3j8eu"></div>`;
});
export {
  Page as default
};
