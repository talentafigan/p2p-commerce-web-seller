<template>
  <v-app>
    <v-row align="center" justify="center" class="ma-0 w-full" dense no-gutters>
      <v-col cols="4 ma-4">
        <v-card
          outlined
          elevation="0"
          rounded="0"
          class="py-12 px-6 rounded-lg d-flex justify-center align-start flex-column"
        >
          <div class="d-flex justify-center flex-column align-start w-full">
            <span class="text-h5 font-weight-bold">Buat akunmu</span>
            <span class="text-subtitle-2 mt-3"
              >Sudah punya akun?
              <span
                @click="$router.push('/auth/login')"
                class="primary--text cursor-pointer"
                >Masuk</span
              ></span
            >
          </div>
          <v-form ref="form" @submit.prevent="onClickRegister" class="mt-3">
            <v-row dense class="ma-0">
              <v-col cols="12" class="mt-3">
                <v-text-field
                  outlined
                  :rules="rules.fullname"
                  v-model="form.fullname"
                  label="Nama Lengkap"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-3">
                <v-text-field
                  outlined
                  :rules="rules.username"
                  v-model="form.username"
                  label="Username"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-3">
                <v-text-field
                  outlined
                  :rules="rules.email"
                  v-model="form.email"
                  label="Email"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-3">
                <v-text-field
                  outlined
                  prefix="+62"
                  :rules="rules.phone"
                  v-model="form.phone"
                  label="Nomor telepon"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col class="mt-3" cols="12">
                <v-text-field
                  v-model="form.password"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  outlined
                  :rules="rules.password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Password"
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
            @click="onClickRegister"
            class="mt-8"
            block
            :disabled="isLoading"
            :loading="isLoading"
            large
            depressed
            color="accent"
            >Daftar</v-btn
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
export default class AuthRegister extends Vue {
  $helpers: any;
  isLoading = false;

  showPassword = false;

  showErrorMessage = false;
  errorMessage = "";

  rules = {
    fullname: [(v: any) => !!v || "Nama lengkap harus diisi."],
    password: [(v: any) => !!v || "Password harus diisi."],
    email: [
      (v: string) => this.formatEmailValidator(v) || "Format email salah.",
    ],
    phone: [
      (v: any) => !!v || "No. Telepon harus diisi.",
      (v: string) => /\d+/.test(v) || "No. Telepon harus berupa angka.",
      (v: string | any[]) =>
        (v && v.length <= 13) || "No. Telepon Maximal 15 digit.",
    ],
    username: [
      (v: any) => !!v || "Username harus diisi.",
      (v: string) =>
        /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(v) === false ||
        "Username hanya boleh berupa huruf dan nomor",
    ],
  };

  formatEmailValidator(val: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
  }

  form = {
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  };

  authApi = new AuthApi();

  $refs: any;
  $snackbar: any;

  async onClickRegister() {
    if (!this.$refs.form.validate()) return;
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.authApi.register({
        ...this.form,
        phone: "62" + this.form.phone,
      });
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      this.$snackbar.open({
        text: "Berhasil Mendaftar !",
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
