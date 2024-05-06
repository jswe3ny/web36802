import { l as lucia } from "../../../../chunks/auth.js";
import { r as redirect } from "../../../../chunks/index.js";
const GET = async (event) => {
  if (!event.locals.session)
    ;
  const userSession = event.locals.session;
  if (userSession) {
    lucia.invalidateSession(userSession.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
  }
  return redirect(302, "/");
};
export {
  GET
};
