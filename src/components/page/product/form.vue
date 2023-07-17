<template>
  <v-form>
    <v-row class="ma-0 w-full">
      <v-col cols="12">
        <span>Pilih kategori :</span>
        <v-card class="mt-3 pa-2" outlined>
          <v-row class="ma-0 pa-0" dense>
            <v-col md="4" v-for="(item, index) in productCategorySelected">
              <v-select
                :placeholder="
                  index === 0 ? 'Pilih kategori' : 'Pilih sub kategori'
                "
                item-text="productCategoryName"
                hide-details="auto"
                @input="onSelectProductCategory(item.productCategoryId, index)"
                item-value="productCategoryId"
                :items="item.productCategoryList"
                v-model="item.productCategoryId"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <span>Nama :</span>
        <v-text-field
          class="mt-3"
          v-model="form.productName"
          dense
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <span>Harga :</span>
        <v-currency-field prefix="Rp" v-model="form.productPrice" />
      </v-col>
      <v-col cols="4">
        <span>Gambar :</span>
        <common-image-dropzone v-model="form.image" class="mt-3" />
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
import { Prop } from "vue-property-decorator";

interface InterfaceFormProduct {
  image: any;
  productName: any;
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

  set form(val) {
    this.$emit("input", val);
  }

  productCategoryApi = new ProductCategoryApi();

  productCategorySelected = [
    {
      productCategoryId: null as any,
      productCategoryList: [] as any,
    },
  ];

  async onChangeImage(event: any) {
    console.log(event);
  }

  async onSelectProductCategory(id: any, index: any) {
    try {
      const resp = await this.productCategoryFetcher(id);
      if (index + 1 !== this.productCategorySelected.length) {
        const newProductCategorySelected = this.productCategorySelected.splice(
          index,
          index + 1 - this.productCategorySelected.length
        );
        console.log(newProductCategorySelected);
        return;
      }
      if (resp.length === 0) {
        this.form.productCategoryId = id;
        return;
      }
      this.productCategorySelected = [
        ...this.productCategorySelected,
        {
          productCategoryId: null,
          productCategoryList: resp,
        },
      ];
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
      this.productCategorySelected[0].productCategoryList =
        await this.productCategoryFetcher();
    } catch (error) {}
  }

  mounted() {
    this.fetchProductCategory();
  }
}
</script>
