<template>
  <v-app>
    <v-row align="center" justify="center" class="ma-0 w-full" dense no-gutters>
      <v-col cols="4">
        <v-card
          outlined
          elevation="0"
          class="py-12 px-6 d-flex justify-center align-start flex-column"
        >
          <div class="d-flex justify-center flex-column align-start w-full">
            <span class="text-h5 font-weight-bold">Lupa Password</span>
            <span class="text-subtitle-2 mt-4"
              >Jangan Khawatir. Mohon masukan email yang terhubung dengan akun
              anda.
            </span>
          </div>
          <v-text-field
            outlined
            v-model="form.email"
            label="Masukan Email Terdaftar"
            class="w-full mt-4"
            hide-details="auto"
          ></v-text-field>
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
            @click="onSubmit"
            :disabled="!form.email || isLoading"
            class="mt-4"
            :loading="isLoading"
            block
            large
            depressed
            color="accent"
            >Submit</v-btn
          >
          <v-btn
            @click="$router.push('/auth/login')"
            class="mt-4"
            block
            large
            depressed
            text
            color="secondary"
          >
            <v-icon dense class="mr-1">mdi-arrow-left</v-icon>
            Kembali ke login</v-btn
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
export default class AuthForgotPassword extends Vue {
  $helpers: any;
  isLoading = false;

  showPassword = false;

  showErrorMessage = false;
  errorMessage = "";

  form = {
    email: "",
  };

  authApi = new AuthApi();

  $snackbar: any;

  async onSubmit() {
    if (!this.form.email) return;
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.authApi.resetPasswordRequest(this.form.email);
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      this.$snackbar.open({
        text: "Kami Telah Mengirim Tautan Untuk Mereset Password, Silahkan Cek Email Kamu!",
        position: "bottom-center",
      });
      await this.$helpers.shortSetTimeOut(1000);
      this.$nextTick(() => {
        this.$router.push("/auth/login");
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
