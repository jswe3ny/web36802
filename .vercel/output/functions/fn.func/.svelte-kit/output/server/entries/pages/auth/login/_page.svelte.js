import { c as create_ssr_component, e as escape } from "../../../../chunks/ssr.js";
import "devalue";
import "../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `  <div class="py-[100px]">${form?.message ? `<div class="toast"><div class="alert alert-info bg-error font-semibold "><span>Error: ${escape(form.message)}</span></div></div>` : ``} <h1 class="text-center text-3xl p-4" data-svelte-h="svelte-1lnbm2z">Login</h1> <form method="post" class="mx-auto py-4 px-10 flex flex-col max-w-sm gap-y-3" data-svelte-h="svelte-1h6ukxn"><div class="flex flex-col gap-1"><label for="username">Username</label> <input name="username" id="username" class="px-4 py-2 max"></div> <div class="flex flex-col gap-1"><label for="password">Password</label> <input type="password" name="password" id="password" class="px-4 py-2 max"></div> <button class="btn btn-success hover:text-gray-light">Continue</button></form></div>`;
});
export {
  Page as default
};
