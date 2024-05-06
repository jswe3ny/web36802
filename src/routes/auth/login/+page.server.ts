// routes/login/+page.server.ts
import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { verify } from "@node-rs/argon2";
import {db} from "../../../lib/server/db"
import { userTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";

import type { Actions } from "./$types";

// import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.session && locals.user) {
		//If user session is found
		redirect(302, `/${locals.user.username}`);
	}
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get("username");
		const password = formData.get("password");

		if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: "Invalid username"
			});
		}
		if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: "Invalid password"
			});
		}

		
        const existingUser = await db.query.userTable.findFirst({
            where: eq(userTable.username, username)
        })
		if (!existingUser) {
			
			return fail(400, {
				message: "Incorrect username or password"
			});
		}

		const validPassword = await verify(existingUser.password_hash, password);
		if (!validPassword) {
			return fail(400, {
				message: "Incorrect username or password"
			});
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, `/${existingUser.username}`);
	}
};