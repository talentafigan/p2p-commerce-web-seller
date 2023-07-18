<template>
  <layout-container brandTitle="Dashboard">
    <v-row dense no-gutters class="ma-0 w-full">
      <v-col cols="12">
        <v-card outlined class="px-5 py-5">
          <v-row dense class="ma-0 w-full">
            <v-col cols="12">
              <span class="text-h6">Ringkasan</span>
              <v-row class="w-full mt-3 ma-0">
                <v-col v-for="(item, Index) in analytics" :key="Index" md="3">
                  <page-dashboard-card-analytic v-bind="item" />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense no-gutters class="ma-0 mt-4 w-full">
      <v-col cols="12">
        <v-card outlined class="px-5 py-5">
          <v-row class="ma-0 w-full">
            <v-col cols="12">
              <span class="text-h6">Kelas dengan transaksi terbanyak</span>
              <v-card rounded="0" outlined class="w-full mt-4">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Nama Kelas</th>
                        <th>Kategori</th>
                        <th>Jumlah transaksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="mostSalesProduct.length === 0">
                        <td colspan="3">
                          <div
                            class="w-full d-flex justify-center flex-column align-center"
                          >
                            <span>Data not found.</span>
                          </div>
                        </td>
                      </tr>
                      <tr v-for="item in mostSalesProduct" :key="item.name">
                        <td>{{ item.productName }}</td>
                        <td>{{ item.productCategories.productCategoryName }}</td>
                        <td>{{ item.totalTransaction }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </layout-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { AnalyticApi } from "@/api/analytic.api";

@Component
export default class Index extends Vue {
  analyticApi = new AnalyticApi();

  analytics = [
    {
      title: "Transaksi",
      content: "-",
      description: "-",
    },
    {
      title: "Penjualan",
      content: "-",
      description: "-",
    },
  ];

  mostSalesProduct = [] as any[];

  $snackbar: any;
  $helpers: any;

  async fetchAnalytic() {
    try {
      const resp = await this.analyticApi.getAnalyticSeller();
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.analytics[0].content = `${this.$helpers.currencyFormat(
        resp.data.data.transaction
      )}`;
      this.analytics[0].description = `${resp.data.data.subTransaction} vs bulan lalu`;
      this.analytics[1].content = `Rp.${this.$helpers.currencyFormat(
        resp.data.data.salesAmount
      )}`;
      this.analytics[1].description = `${resp.data.data.subSalesAmount} vs bulan lalu`;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$snackbar.open({
        text: errorMessage,
      });
    }
  }

  async fetchMostSales() {
    try {
      const resp = await this.analyticApi.mostSalesProduct();
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.mostSalesProduct = resp.data.data;
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
    this.fetchAnalytic();
    this.fetchMostSales();
  }
}
</script>
