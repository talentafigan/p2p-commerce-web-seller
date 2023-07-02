<template>
  <v-row dense no-gutters class="w-full">
    <v-col class="pb-2" cols="12">
      <v-row class="ma-0">
        <v-col md="4">
          <v-card elevation="0" class="pa-2">
            <common-image-dropzone />
          </v-card>
        </v-col>
        <v-col md="8">
          <v-card elevation="0" class="pa-2">
            <span class="text-h6">Data Diri</span>
            <v-form ref="form" @submit.prevent="onSave" class="mt-4">
              <v-text-field
                label="Nama Lengkap"
                :rules="rules.fullname"
                hide-details="auto"
                v-model="form.fullname"
              ></v-text-field>
              <v-text-field
                readonly
                :rules="rules.username"
                class="mt-4"
                v-model="form.username"
                label="Username"
                hide-details="auto"
              ></v-text-field>
              <v-text-field
                label="Email"
                :rules="rules.email"
                class="mt-4"
                v-model="form.email"
                hide-details="auto"
              ></v-text-field>
              <v-text-field
                v-model="form.phone"
                class="mt-4"
                :rules="rules.phone"
                label="Nomor Telepon"
                hide-details="auto"
                prefix="+62"
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
                @click="onSave"
                class="mt-4"
                :disabled="isLoading"
                :loading="isLoading"
                depressed
                color="accent"
                >Simpan</v-btn
              >
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col></v-col>
  </v-row>
</template>

<script lang="ts">
import { ProfileApi } from "@/api/profile.api";
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class PageAccountFormProfile extends Vue {
  form = {
    fullname: "",
    username: "",
    phone: "",
    email: "",
  };

  $refs: any;

  showErrorMessage = false;
  isLoading = false;
  errorMessage = "";

  formatEmailValidator(val: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
  }

  async onSave() {
    if (!this.$refs.form.validate()) return;
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.profileApi.update({
        ...this.form,
        phone: "62" + this.form.phone,
      });
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      this.$snackbar.open({
        text: "Berhasil Update Profil!",
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

  rules = {
    fullname: [(v: any) => !!v || "Nama lengkap harus diisi."],
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

  profileApi = new ProfileApi();

  $snackbar: any;

  async fetchProfile() {
    try {
      const resp = await this.profileApi.me();
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.form = resp.data.data.user;
      this.form.phone = this.form.phone
        ? this.form.phone.slice(2, this.form.phone.length - 2)
        : "";
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$snackbar.open({
        text: errorMessage,
      });
    }
  }

  mounted() {
    this.fetchProfile();
  }
}
</script>
