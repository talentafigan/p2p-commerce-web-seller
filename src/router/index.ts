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
  {
    name: "authResetPassword",
    path: "/auth/reset-password",
    component: Module.authResetPassword,
  },
  {
    name: "accountProfile",
    path: "/account/profile",
    component: Module.accountProfile,
  },
  {
    name: "product-transaction",
    path: "/product-transaction",
    component: Module.productTransaction,
  },
  {
    name: "product",
    path: "/product",
    component: Module.product,
  },
  {
    name: "product",
    path: "/product/create",
    component: Module.productCreate,
  },
  {
    name: "product",
    path: "/product/:id",
    component: Module.productDetail,
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
