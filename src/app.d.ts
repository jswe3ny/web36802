// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// src/app.d.ts
declare global {
	namespace App {
		interface Locals {
			user: import("lucia").User | null;
			session: import("lucia").Session | null;
		}
		
	}
}

export {};