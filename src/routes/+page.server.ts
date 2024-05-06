import { fail,redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Redirect if No User 
	// Check later if locals.user is secure enough
	if (locals.user) {
		redirect(302, `/${locals.user.username}`);
	}
}