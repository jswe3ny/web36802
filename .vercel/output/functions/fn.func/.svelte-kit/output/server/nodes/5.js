import * as server from '../entries/pages/_user_/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_user_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/[user]/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.vGP-KCAJ.js","_app/immutable/chunks/scheduler.D8c12eMh.js","_app/immutable/chunks/index.B2zEa4Va.js","_app/immutable/chunks/forms.6OZuDPBn.js","_app/immutable/chunks/entry.QSu5oEZn.js"];
export const stylesheets = [];
export const fonts = [];
