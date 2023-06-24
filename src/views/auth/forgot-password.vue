<template>
  <v-app>
    <v-row align="center" justify="center" class="ma-0 w-full" dense no-gutters>
      <v-col cols="4">
        <v-card
          outlined
          elevation="0"
          rounded="lg"
          class="py-12 px-6 d-flex justify-center align-start flex-column"
        >
          <div class="d-flex justify-center flex-column align-start w-full">
            <span class="text-h5 font-weight-bold">Reset Password</span>
            <span class="text-subtitle-2 mt-4"
              >Kami akan mengirim anda tautan untuk reset password.
            </span>
          </div>
          <v-form @submit.prevent="onClickLogin" class="mt-3 w-full">
            <v-row dense class="ma-0">
              <v-col cols="12">
                <v-text-field
                  outlined
                  v-model="form.key"
                  label="Masukan Email Terdaftar"
                  class="mt-2"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-alert
            class="w-full ma-0 mt-4"
            v-if="showErrorMessage"
            dense
            type="error"
            text
          >
            {{ errorMessage }}
          </v-alert>
          <v-row dense class="ma-0 mt-6 w-full">
            <v-col md="6" cols="12">
              <v-btn
                @click="$router.push('/auth/login')"
                large
                block
                outlined
                depressed
                color="accent"
                >Kembali</v-btn
              >
            </v-col>
            <v-col>
              <v-btn
                @click="onClickLogin"
                :loading="isLoading"
                large
                block
                depressed
                color="accent"
                >Konfirmasi</v-btn
              >
            </v-col>
          </v-row>
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
export default class AuthForgotPassword extends Vue {
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
