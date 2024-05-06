import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { db } from "./db";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, userTable } from "./schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username
        }
    }
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia,
        DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}