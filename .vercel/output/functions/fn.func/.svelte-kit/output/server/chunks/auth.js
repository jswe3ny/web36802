import { Lucia } from "lucia";
import { D as DEV } from "./prod-ssr.js";
import { d as db, s as sessionTable, u as userTable } from "./db.js";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
const dev = DEV;
const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username
    };
  }
});
export {
  lucia as l
};
