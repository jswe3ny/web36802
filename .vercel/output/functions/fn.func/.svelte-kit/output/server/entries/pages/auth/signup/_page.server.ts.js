import { l as lucia } from "../../../../chunks/auth.js";
import { r as redirect, f as fail } from "../../../../chunks/index.js";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { d as db, u as userTable } from "../../../../chunks/db.js";
import { eq } from "drizzle-orm";
const load = ({ locals }) => {
  if (locals.session && locals.user) {
    redirect(302, `/${locals.user.username}`);
  }
};
const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    const passwordConfirm = formData.get("confirm-password");
    if (typeof username !== "string" || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
      return fail(400, {
        message: "Invalid username"
      });
    }
    const usernameTaken = await db.query.userTable.findFirst({
      where: eq(userTable.username, username)
    });
    if (usernameTaken) {
      console.log("error");
      return fail(400, {
        message: "Username Taken"
      });
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
    const userId = generateIdFromEntropySize(10);
    const passwordHash = await hash(password);
    await db.insert(userTable).values({
      id: userId,
      username,
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
export {
  actions,
  load
};
