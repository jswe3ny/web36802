import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";

import {db} from "../../../lib/server/db"

import type { Actions } from "./$types";
import { userTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";

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
		const passwordConfirm = formData.get("confirm-password")
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
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
	
		const usernameTaken = await db.query.userTable.findFirst({
			where: eq(userTable.username, username)
		})

		if(usernameTaken){
			console.log("error")
			return fail(400, {
				message: "Username Taken"
			})
		}
		if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: "Invalid password"
			});
		}
		console.log("password: " + password);
		console.log("password confirm: " + passwordConfirm);

		if (password != passwordConfirm?.toString()) {
			return fail(400, {
				message: "Passwords do not match"
			});
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await hash(password);

		// TODO: check if username is already used
		await db.insert(userTable).values({
			id: userId,
			username: username,
			password_hash: passwordHash
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, `/${username}`);
	}
};