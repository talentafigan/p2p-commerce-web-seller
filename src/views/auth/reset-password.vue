<template>
  <v-app>
    <v-dialog
      overlay-color="#F0F8FB"
      :overlay-opacity="0.9"
      persistent
      v-model="showDialogInvalidUrl"
      max-width="290"
    >
      <v-card class="pa-5 d-flex flex-column">
        <span class="text-subtitle-1 font-weight-bold">URL tidak valid </span>
        <span class="text-subtitle-2 mt-2">
          Silahkan lakukan permintaan perubahan password lagi
        </span>
        <div class="mt-3 w-full d-flex justify-start align-center flex-row">
          <v-btn
            @click="$router.push('/auth/forgot-password')"
            small
            color="primary"
          >
            Oke
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-row align="center" justify="center" class="ma-0 w-full" dense no-gutters>
      <v-col cols="4">
        <v-card
          outlined
          elevation="0"
          rounded="0"
          class="py-12 px-6 rounded-lg d-flex justify-center align-start flex-column"
        >
          <div class="d-flex justify-center flex-column align-start w-full">
            <span class="text-h5 font-weight-bold">Buat Password Baru</span>
            <span class="mt-3 text-subtitle-2"
              >Password baru anda harus berbeda dengan password sebelumnya yang
              anda gunakan</span
            >
          </div>
          <v-form ref="form" class="w-full mt-4" @submit.prevent="onSubmit">
            <v-row dense class="ma-0">
              <v-col cols="12">
                <v-text-field
                  v-model="form.password"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  outlined
                  :rules="rules.password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Masukan Password Baru"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-text-field
                  v-model="form.confirmPassword"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  outlined
                  :rules="rules.confirmPassword"
                  :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Konfirmasi Password Baru"
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
          <v-btn
            @click="onSubmit"
            :disabled="isLoading"
            class="mt-4"
            block
            :loading="isLoading"
            large
            depressed
            color="accent"
            >Konfirmasi</v-btn
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
export default class AuthResetPassword extends Vue {
  $helpers: any;
  $snackbar: any;
  isLoading = false;

  showDialogInvalidUrl = false;
  showPassword = false;
  showConfirmPassword = false;

  showErrorMessage = false;
  errorMessage = "";
  token = this.$route.query.token as string;

  form = {
    password: "",
    confirmPassword: "",
  };

  $refs: any;

  rules = {
    password: [(v: any) => !!v || "Password Baru harus diisi."],
    confirmPassword: [
      (v: any) => !!v || "Konfirmasi Password harus diisi.",
      (v: any) => v === this.form.password || "Konfirmasi Password tidak sama.",
    ],
  };

  authApi = new AuthApi();

  async onSubmit() {
    if (!this.$refs.form.validate()) return;
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.authApi.resetPasswordNewPassword({
        code: this.token,
        newPassword: this.form.password,
      });
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      this.$snackbar.open({
        text: "Password berhasil diubah, silahkan login kembali!",
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

  async validateToken() {
    if (!this.token) {
      this.showDialogInvalidUrl = true;
      return;
    }
    try {
      const response = await this.authApi.resetPasswordCheckCode(this.token);
      if (response.data.code !== "SUCCESS") {
        this.showDialogInvalidUrl = true;
      }
    } catch (error) {
      this.showDialogInvalidUrl = true;
    }
  }

  mounted() {
    this.validateToken();
  }
}
</script>
