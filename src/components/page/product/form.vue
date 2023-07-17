<template>
  <v-form>
    <v-row class="ma-0 w-full">
      <v-col md="8">
        <span>Pilih kategori :</span>
        <v-row class="ma-0 pa-0" dense>
          <v-col md="6">
            <v-select
              placeholder="Pilih Kategori"
              item-text="productCategoryName"
              @input="onChangeProductCategoryParent"
              item-value="productCategoryId"
              hide-details="auto"
              :items="productCategoryParentList"
              v-model="form.productCategoryParentId"
            >
            </v-select>
          </v-col>
          <v-col md="6">
            <v-select
              placeholder="Pilih Sub Kategori"
              item-text="productCategoryName"
              item-value="productCategoryId"
              hide-details="auto"
              :items="productCategoryList"
              v-model="form.productCategoryId"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="8">
        <span>Nama :</span>
        <v-text-field
          class="mt-3"
          v-model="form.productName"
          dense
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col md="8">
        <span>Harga :</span>
        <v-currency-field prefix="Rp" v-model="form.productPrice" />
      </v-col>
      <v-col cols="12">
        <v-row dense class="ma-0 pa-0">
          <v-col md="4">
            <span>Gambar :</span>
            <common-image-dropzone v-model="form.image" class="mt-3" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <span>Deskripsi :</span>
        <vue-editor class="mt-3" v-model="form.productDescription" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ProductCategoryApi } from "@/api/product-category.api";
import { Prop, Watch } from "vue-property-decorator";

interface InterfaceFormProduct {
  image: any;
  productName: any;
  productCategoryParentId?: any;
  productCategoryId: any;
  productDescription: any;
  productPrice: number;
}

@Component
export default class PageProductForm extends Vue {
  @Prop()
  value!: InterfaceFormProduct;

  get form() {
    return this.value;
  }

  @Watch("form")
  onChangeForm(val: InterfaceFormProduct) {
    if (val.productCategoryParentId) {
      this.autoFillProductCategory();
    }
  }

  productCategoryParentList = [] as any[];
  productCategoryList = [] as any[];

  set form(val) {
    this.$emit("input", val);
  }

  productCategoryApi = new ProductCategoryApi();

  async onChangeProductCategoryParent() {
    this.productCategoryList = [];
    try {
      this.productCategoryList = await this.productCategoryFetcher(
        this.form.productCategoryParentId
      );
    } catch (error) {}
  }

  async productCategoryFetcher(parentId?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await this.productCategoryApi.get({
          parentId,
        });
        if (resp.data.status !== "SUCCESS") return;
        resolve(resp.data.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  async fetchProductCategory() {
    try {
      this.productCategoryParentList = await this.productCategoryFetcher();
    } catch (error) {}
  }

  async autoFillProductCategory() {
    if (!this.form.productCategoryParentId) return;
    this.onChangeProductCategoryParent();
  }

  mounted() {
    this.fetchProductCategory();
  }
}
</script>
