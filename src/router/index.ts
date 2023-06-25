import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Module from "@/router/module";
import { authMiddleware } from "@/plugins/middleware";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    name: "dashboard",
    path: "/",
    component: Module.index,
  },
  {
    name: "authLogin",
    path: "/auth/login",
    component: Module.authLogin,
  },
  {
    name: "authRegister",
    path: "/auth/register",
    component: Module.authRegister,
  },
  {
    name: "authForgotPassword",
    path: "/auth/forgot-password",
    component: Module.authForgotPassword,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  authMiddleware({ to, from, next });
});


export default router;
