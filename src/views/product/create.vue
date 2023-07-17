<template>
  <layout-container back brandTitle="Tambah kelas">
    <template #tools-navigation>
      <v-btn
        :loading="isLoading"
        :disabled="isLoading"
        @click="onSave"
        depressed
        color="primary"
        >Buat kelas</v-btn
      >
    </template>
    <v-card class="pa-4 w-full">
      <v-alert
        class="w-full ma-0 mt-4"
        v-if="showErrorMessage"
        dense
        type="error"
        text
      >
        {{ errorMessage }}
      </v-alert>
      <page-product-form v-model="form"></page-product-form>
    </v-card>
  </layout-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ProductApi } from "@/api/product.api";

@Component
export default class ProductCreate extends Vue {
  form = {
    image: null,
    productName: null,
    productCategoryId: null,
    productDescription: null,
    productPrice: 0,
  };

  productApi = new ProductApi();

  showErrorMessage = false;
  errorMessage = null;
  isLoading = false;

  $snackbar: any;

  async onSave() {
    this.showErrorMessage = false;
    this.isLoading = true;
    try {
      const response = await this.productApi.create(this.form);
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      this.$snackbar.open({
        text: "Berhasil Membuat kelas!",
      });
      this.$router.push("/product");
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
