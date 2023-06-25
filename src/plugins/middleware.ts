import store from "@/store";
import Helpers from "./helpers";

const authRouter = ["authLogin", "authRegister", "authForgotPassword"];

export const authMiddleware = (ctx: any) => {
  const vuex = localStorage.getItem("vuex");
  if (!vuex) {
    if (authRouter.includes(ctx.to.name)) return ctx.next();
    return ctx.next("/auth/login");
  }
  const vuexParsed = JSON.parse(vuex);
  if (vuexParsed.auth.token === null) {
    if (authRouter.includes(ctx.to.name)) return ctx.next();
    return ctx.next("/auth/login");
  }
  if (authRouter.includes(ctx.to.name)) return ctx.next("/");
  return ctx.next();
};
