import { c as create_ssr_component, e as escape, d as each } from "../../../chunks/ssr.js";
import "devalue";
import "../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  console.log(data.displayData);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h1 class="text-3xl text-center p-6">${escape(data.user?.username)}&#39;s Dashboard</h1>  <div class="mx-4 overflow-x-auto min-h-[80vh]">${data.displayData.length > 0 ? `<div class="mx-auto max-h-[400px] overflow-y-scroll max-w-3xl"><table class="table max-w-2xl mx-auto "> <thead data-svelte-h="svelte-k7h23u"><tr><th>Ticker</th> <th>Shares</th> <th>Value</th> <th class="hidden sm:table-cell">Average P/E</th> <th class="hidden sm:table-cell">Return</th></tr></thead> <tbody>${each(data.displayData, (stock) => {
    return `<tr class="hover"><th>${escape(stock?.ticker)}</th> <td class="py-5">${escape(stock?.info.numShares)}</td> <td>${escape(stock?.info.totalCost)}</td> <td class="hidden sm:table-cell">${escape(stock?.info.averagePE)}</td> <td class="hidden sm:table-cell" data-svelte-h="svelte-w6dmkm">Test</td> </tr>`;
  })}</tbody></table></div>` : `<p class="text-lg text-center" data-svelte-h="svelte-fcybee">No buy info has been added yet</p>`}  <div class="max-w-2xl mx-auto" data-svelte-h="svelte-1yqv2yh">   <form method="POST" class="flex flex-col p-6 gap-3"><label class="input input-bordered flex items-center gap-2"><input type="text" class="grow" name="ticker" placeholder="Ticker"></label> <label class="input input-bordered flex items-center gap-2"><input type="number" class="grow" name="numShares" placeholder="Number of Shares"></label> <label class="input input-bordered flex items-center gap-2"><input type="date" class="grow" name="buyDate" placeholder="Purchase Date"></label> <label class="input input-bordered flex items-center gap-2"><input type="number" step=".01" class="grow" name="costPerShare" placeholder="Cost Per Share"></label> <button class="btn btn-primary">submit</button></form>  </div></div>`;
});
export {
  Page as default
};
