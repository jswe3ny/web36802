import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import {page} from "$app/stores"

export const load: LayoutServerLoad = ({ locals }) => {
    if (!locals.user) {
        // redirect(307, "/auth/login")
        
    }
    return {
        user: locals.user
    }
};