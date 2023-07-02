<template>
  <v-card elevation="0" class="pa-6">
    <span class="text-h6">Ubah Kata Sandi</span>
    <v-form class="mt-4">
      <v-text-field
        label="Password Lama"
        @click:append="showOldPassword = !showOldPassword"
        :type="showOldPassword ? 'text' : 'password'"
        :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
        hide-details="auto"
        v-model="form.oldPassword"
      ></v-text-field>
      <v-text-field
        readonly
        class="mt-4"
        @click:append="showNewPassword = !showNewPassword"
        :type="showNewPassword ? 'text' : 'password'"
        :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
        v-model="form.newPassword"
        label="Password Baru"
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        label="Konfirmasi Password"
        class="mt-4"
        @click:append="showConfirmPassword = !showConfirmPassword"
        :type="showConfirmPassword ? 'text' : 'password'"
        :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
        v-model="form.confirmPassword"
        hide-details="auto"
      ></v-text-field>
      <v-btn class="mt-6" color="primary" depressed>Simpan</v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class PageAccountFormProfile extends Vue {
  form = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
}
</script>
