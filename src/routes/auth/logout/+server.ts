import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";

export const GET = async (event) => {
	if (!event.locals.session) {
		// No Session
		fail(401, {
			message: "No Session"
		})
	}
	
	const userSession = event.locals.session;
	if (userSession) {
		lucia.invalidateSession(userSession.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}

	return redirect(302, "/")
};