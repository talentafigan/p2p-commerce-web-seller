<template>
  <layout-container back brandTitle="Detail kelas">
    <template #tools-navigation>
      <v-btn
        :loading="isLoading"
        :disabled="isLoading"
        @click="onSave"
        depressed
        color="primary"
        >Simpan kelas</v-btn
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
export default class ProductDetail extends Vue {
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
    const id = this.$route.params.id as any;
    try {
      const response = await this.productApi.update(id, this.form);
      if (response.data.status !== "SUCCESS") {
        this.showErrorMessage = true;
        this.errorMessage = response.data.message;
        return;
      }
      this.$snackbar.open({
        text: "Berhasil Mengupdate kelas!",
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

  async fetchProduct() {
    const id = this.$route.params.id as any;
    try {
      const resp = await this.productApi.getDetail(id);
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.form = resp.data.data;
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
    this.fetchProduct();
  }
}
</script>
