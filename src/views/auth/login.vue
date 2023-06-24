<template>
  <v-app>
    <v-row align="center" justify="center" class="ma-0 w-full" dense no-gutters>
      <v-col cols="4">
        <v-card
          outlined
          elevation="0"
          rounded="0"
          class="py-12 px-6 rounded-lg d-flex justify-center align-start flex-column"
        >
          <div class="d-flex justify-center flex-column align-start w-full">
            <span class="text-h5 font-weight-bold">Masuk</span>
            <span class="text-subtitle-2 mt-3"
              >Belum ada akun?
              <span
                @click="$router.push('/auth/register')"
                class="primary--text cursor-pointer"
                >Daftar</span
              ></span
            >
          </div>
          <v-form @submit.prevent="onClickLogin" class="mt-3">
            <v-row dense class="ma-0">
              <v-col cols="12">
                <v-text-field
                  outlined
                  v-model="form.key"
                  label="Masukan  Username Atau Email"
                  class="mt-2"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col class="mt-3" cols="12">
                <v-text-field
                  class="mt-2"
                  v-model="form.password"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  outlined  
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Masukan Password"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <div class="d-flex justify-end align-center flex-col w-full">
            <span
              @click="$router.push('/auth/forgot-password')"
              class="text-subtitle-2 primary--text cursor-pointer mt-3"
              >Lupa Kata Sandi?
            </span>
          </div>
          <v-alert
            class="w-full ma-0 mt-4"
            v-if="showErrorMessage"
            dense
            type="error"
            text
          >
            {{ errorMessage }}
          </v-alert>
          <v-btn
            @click="onClickLogin"
            class="mt-4"
            block
            :disabled="!form.key || !form.password"
            :loading="isLoading"
            large
            depressed
            color="accent"
            >Masuk</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { AuthApi } from "@/api/auth.api";

@Component
export default class AuthLogin extends Vue {
  $helpers: any;
  isLoading = false;

  showPassword = false;

  showErrorMessage = false;
  errorMessage = "";

  form = {
    key: "",
    password: "",
  };

  authApi = new AuthApi();

  async onClickLogin() {
    if (!this.form.key || !this.form.password) return;
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.authApi.login(this.form);
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      this.$store.commit("auth/setAuth", {
        token: response.data.data.accessToken,
        user: response.data.data.user,
      });
      this.$nextTick(() => {
        window.location.reload();
      });
    } catch (error: any) {
      this.showErrorMessage = true;
      this.errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
