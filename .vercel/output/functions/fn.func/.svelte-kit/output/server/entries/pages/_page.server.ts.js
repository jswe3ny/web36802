import { r as redirect } from "../../chunks/index.js";
const load = async ({ locals }) => {
  if (locals.user) {
    redirect(302, `/${locals.user.username}`);
  }
};
export {
  load
};
