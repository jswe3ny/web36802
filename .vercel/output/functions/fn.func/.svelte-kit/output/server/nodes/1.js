

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.DI164yjc.js","_app/immutable/chunks/scheduler.D8c12eMh.js","_app/immutable/chunks/index.B2zEa4Va.js","_app/immutable/chunks/entry.DdtdLJ3f.js"];
export const stylesheets = [];
export const fonts = [];
