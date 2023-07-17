export default {
  index: require("@/views/index.vue").default,
  authLogin: require("@/views/auth/login.vue").default,
  authRegister: require("@/views/auth/register.vue").default,
  authForgotPassword: require("@/views/auth/forgot-password.vue").default,
  authResetPassword: require("@/views/auth/reset-password.vue").default,
  accountProfile: require("@/views/account/profile.vue").default,
  productTransaction: require("@/views/product-transaction/index.vue").default,
  product: require("@/views/product/index.vue").default,
  productCreate: require("@/views/product/create.vue").default,
  productDetail: require("@/views/product/_id.vue").default,
};
