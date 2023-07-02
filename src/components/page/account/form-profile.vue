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
            <v-form class="mt-4">
              <v-text-field
                label="Nama Lengkap"
                hide-details="auto"
                v-model="form.fullname"
              ></v-text-field>
              <v-text-field
                readonly
                class="mt-4"
                v-model="form.username"
                label="Username"
                hide-details="auto"
              ></v-text-field>
              <v-text-field
                label="Email"
                class="mt-4"
                v-model="form.email"
                hide-details="auto"
              ></v-text-field>
              <v-text-field
                v-model="form.phone"
                class="mt-4"
                label="Nomor Telepon"
                hide-details="auto"
                prefix="+62"
              ></v-text-field>
              <v-btn class="mt-4" color="primary" depressed>Simpan</v-btn>
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
