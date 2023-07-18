<template>
  <layout-container brandTitle="Kelas">
    <template #tools-navigation>
      <v-btn @click="$router.push('/product/create')" depressed color="primary">
        <v-icon small class="mr-1">mdi-plus</v-icon>
        Tambah Kelas</v-btn
      >
    </template>
    <v-card class="w-full mt-1" outlined>
      <v-data-table
        :headers="tableHeader"
        :items="product"
        :items-per-page="5"
        class="elevation-0 w-full"
      >
        <template #[`item.info`]="row">
          <div class="d-flex justify-start items-center pa-2 flex-column">
            <img
              style="height: 80px; max-width: 100px"
              :src="row.item.image"
              alt=""
            />
            <span class="mt-2 text-caption">{{ row.item.productName }}</span>
          </div>
        </template>
        <template #[`item.productPrice`]="row">
          <span class="text-subtitle-2"
            >Rp {{ $helpers.currencyFormat(row.item.productPrice) }}</span
          >
        </template>
        <template #[`item.action`]="row">
          <v-btn @click="onClickDelete(row.item.productId)" icon color="primary"
            ><v-icon>mdi-delete</v-icon></v-btn
          >
          <v-btn
            @click="$router.push('/product/' + row.item.productId)"
            icon
            color="primary"
            ><v-icon>mdi-eye</v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-card>
  </layout-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ProductApi } from "@/api/product.api";

@Component
export default class Product extends Vue {
  productApi = new ProductApi();
  $helpers: any;
  dialogFilter = false;

  tableHeader = [
    {
      text: "Info",
      value: "info",
      sortable: false,
      width: 200,
    },
    {
      text: "Harga",
      value: "productPrice",
      sortable: false,
    },
    {
      text: "Karegori",
      value: "productCategories.productCategoryName",
      sortable: false,
    },
    {
      text: "Status",
      value: "status.statusName",
      sortable: false,
    },
    {
      text: "Aksi",
      value: "action",
      sortable: false,
      align: "center",
    },
  ];

  product = [] as any[];

  $snackbar: any;

  isLoading = false;

  async fetchProduct() {
    this.isLoading = true;
    try {
      const resp = await this.productApi.get({
        page: 0,
        size: 1000,
      });
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.product = resp.data.data.content;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$snackbar.open({
        text: errorMessage,
      });
    } finally {
      this.isLoading = false;
    }
  }

  async onClickDelete(id: any) {
    try {
      const response = await this.productApi.delete(id);
      if (response.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: response.data.message,
        });
        return;
      }
      this.$snackbar.open({
        text: "Berhasil Menghapus kelas!",
      });
      this.fetchProduct();
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$snackbar.open({
        text: errorMessage,
      });
    } finally {
      this.isLoading = false;
    }
  }

  mounted() {
    this.fetchProduct();
  }
}
</script>
