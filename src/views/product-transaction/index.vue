<template>
  <layout-container brandTitle="Transaksi">
    <v-dialog v-model="dialogDetail" width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6">Detail Transaksi</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card v-if="productTransactionDetail !== null" class="pa-5">
          <div class="d-flex justify-space-between flex-row w-full">
            <span class="text-subtitle-2">ID. Transaksi </span>
            <span class="text-subtitle-2">{{
              productTransactionDetail.productTransactionId
            }}</span>
          </div>
          <div class="d-flex mt-2 justify-space-between flex-row w-full">
            <span class="text-subtitle-2">Tanggal Transaksi </span>
            <span class="text-subtitle-2">{{
              $helpers.fullDate(productTransactionDetail.createDate)
            }}</span>
          </div>
          <div class="d-flex mt-2 justify-space-between flex-row w-full">
            <span class="text-subtitle-2">Status </span>
            <span class="text-subtitle-2">{{
              productTransactionDetail.productTransactionStatus
                .productTransactionStatusName
            }}</span>
          </div>
          <div
            v-if="
              productTransactionDetail.productTransactionStatus
                .productTransactionStatusId === 6
            "
            class="d-flex mt-2 justify-space-between flex-row w-full"
          >
            <span class="text-subtitle-2">Tanggal pembatalan </span>
            <span class="text-subtitle-2 font-weight-bold">{{
              productTransactionDetail.createDate
            }}</span>
          </div>
          <div
            v-if="
              productTransactionDetail.productTransactionStatus
                .productTransactionStatusId === 6
            "
            class="d-flex mt-2 justify-space-between flex-row w-full"
          >
            <span class="text-subtitle-2">Dibatalkan oleh</span>
            <span class="text-subtitle-2 font-weight-bold">{{
              productTransactionDetail.canceledBy.userType.userTypeName
            }}</span>
          </div>
          <div class="d-flex mt-2 justify-space-between flex-row w-full">
            <span class="text-subtitle-2">Pembeli </span>
            <span class="text-subtitle-2 font-weight-bold">{{
              productTransactionDetail.client.fullname
            }}</span>
          </div>

          <v-divider class="my-4"></v-divider>
          <div class="d-flex justify-space-between align-center flex-row">
            <span class="font-weight-bold text-subtitle-2">Detail Kelas</span>
          </div>
          <v-card
            @click="onClickDetailProduct"
            class="cursor-pointer mt-2 pa-4"
            outlined
          >
            <v-row align="center" class="ma-0" no-gutters dense>
              <v-col cols="8">
                <v-row class="ma-0" align="center" no-gutters dense>
                  <v-col cols="4">
                    <img
                      style="width: 100%; height: 70px"
                      :src="productTransactionDetail.product.image"
                      alt=""
                    />
                  </v-col>
                  <v-col cols="8">
                    <div class="px-4 d-flex justify-center flex-column">
                      <span class="text-subtitle-1 font-weight-bold">{{
                        productTransactionDetail.product.productName
                      }}</span>
                      <span class="text-subtitle-2 mt-2"
                        >Rp
                        {{
                          $helpers.currencyFormat(
                            productTransactionDetail.product.productPrice
                          )
                        }}</span
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="4">
                <div
                  style="border-left: 1px dashed rgb(199, 199, 199)"
                  class="px-4 d-flex w-full justify-center align-end flex-column"
                >
                  <span class="text-subtitle-2 font-weight-bold"
                    >Total Transaksi</span
                  >
                  <span class="text-subtitle-2 mt-2"
                    >Rp
                    {{
                      $helpers.currencyFormat(
                        productTransactionDetail.product?.productPrice
                      )
                    }}</span
                  >
                </div>
              </v-col>
            </v-row>
          </v-card>
          <div
            v-if="
              productTransactionDetail.productTransactionStatus
                .productTransactionStatusId === 5
            "
            class="d-flex mt-4 justify-start align-start flex-column"
          >
            <span class="font-weight-bold text-subtitle-2">Penilaian</span>
            <div
              class="w-full mt-6 d-flex justify-center align-center flex-column"
            >
              <v-rating
                disabled
                :length="5"
                large
                background-color="grey lighten-1"
                color="yellow"
                readonly
                dense
                :value="productTransactionDetail.rating"
              ></v-rating>
              <v-textarea
                :value="productTransactionDetail.ratingDesctiption"
                dense
                hide-details="auto"
                class="w-full"
                rows="3"
                disabled
              ></v-textarea>
            </div>
          </div>
          <v-divider
            v-if="
              productTransactionDetail.productTransactionStatus
                .productTransactionStatusId === 3 ||
              productTransactionDetail.productTransactionStatus
                .productTransactionStatusId === 4
            "
            class="my-4"
          ></v-divider>
          <div
            v-if="
              productTransactionDetail.productTransactionStatus
                .productTransactionStatusId === 3 ||
              productTransactionDetail.productTransactionStatus
                .productTransactionStatusId === 4
            "
            class="d-flex justify-space-between align-center flex-row"
          >
            <span class="font-weight-bold text-subtitle-2"
              >Bukti Pembayaran</span
            >
          </div>
          <v-card
            v-if="
              productTransactionDetail.productTransactionStatus
                .productTransactionStatusId === 3 ||
              productTransactionDetail.productTransactionStatus
                .productTransactionStatusId === 4
            "
            class="mt-2 pa-4"
            outlined
          >
            <v-row align="center" class="ma-0" no-gutters dense>
              <v-col cols="12">
                <v-row class="ma-0" align="center" no-gutters dense>
                  <v-col
                    style="border: dashed rgb(209, 209, 209) 1px"
                    class="pa-2 rounded-lg"
                    cols="3"
                  >
                    <img
                      class="cursor-pointer"
                      @click="onPreviewProof(productTransactionDetail.proof)"
                      style="width: 100%; height: 90px; object-fit: cover"
                      :src="productTransactionDetail.proof"
                      alt=""
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <div
              class="d-flex mt-5 w-full justify-center align-center flex-column"
            >
              <v-btn
                :loading="isLoadingUpdateStatus"
                :disabled="isLoadingUpdateStatus"
                @click="
                  onClickUpdateStatus(
                    productTransactionDetail.productTransactionId,
                    5
                  )
                "
                depressed
                block
                color="primary"
                small
                >Approve</v-btn
              >
              <v-btn
                :loading="isLoadingUpdateStatus"
                :disabled="isLoadingUpdateStatus"
                @click="
                  onClickUpdateStatus(
                    productTransactionDetail.productTransactionId,
                    4
                  )
                "
                depressed
                block
                class="mt-2"
                color="primary"
                outlined
                small
                >Tolak</v-btn
              >
            </div>
          </v-card>
        </v-card>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogApprove"
      @click.outside="
        () => {
          formApprove = {
            productTransactionId: null,
            note: null,
          };
        }
      "
      width="400px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h6">Terima Pesanan</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card class="pa-5">
          <v-textarea
            solo
            hide-details="auto"
            label="Catatan"
            rows="4"
            v-model="formApprove.note"
            placeholder="Catatan petunjuk pembayaran untuk pembeli."
          ></v-textarea>
          <v-btn
            :loading="isLoadingApprove"
            :disabled="isLoadingApprove || !formApprove.note"
            depressed
            class="mt-4"
            @click="onConfirmApprove"
            color="primary"
            block
            >Konfirmasi</v-btn
          >
        </v-card>
      </v-card>
    </v-dialog>
    <v-card class="w-full mt-3" outlined>
      <v-data-table
        :headers="tableHeader"
        :items="productTransaction"
        :items-per-page="5"
        class="elevation-0 w-full"
      >
        <template #[`item.createDate`]="row">
          <span class="text-subtitle-2">{{
            $helpers.fullDate(row.item.createDate)
          }}</span>
        </template>
        <template #[`item.amount`]="row">
          <span class="text-subtitle-2"
            >Rp {{ $helpers.currencyFormat(row.item.amount) }}</span
          >
        </template>
        <template #[`item.action`]="row">
          <v-menu bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on="on" v-bind="attrs" depressed small color="primary"
                >Aksi
                <v-icon class="ml-1" dense small>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list nav dense>
              <v-list-item-group color="primary">
                <v-list-item
                  @click="onClickDetail(row.item.productTransactionId)"
                >
                  <v-list-item-content>
                    <v-list-item-title>Detail</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="
                    row.item.productTransactionStatus
                      .productTransactionStatusId === 1
                  "
                >
                  <v-list-item-content
                    @click="onClickApprove(row.item.productTransactionId)"
                  >
                    <v-list-item-title>Terima Pesanan</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="
                    row.item.productTransactionStatus
                      .productTransactionStatusId === 1
                  "
                >
                  <v-list-item-content
                    @click="onClickCancel(row.item.productTransactionId)"
                  >
                    <v-list-item-title>Tolak Pesanan</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
  </layout-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ProductTransactionApi } from "@/api/product-transaction.api";

@Component
export default class ProductTransaction extends Vue {
  productTransactionApi = new ProductTransactionApi();
  $helpers: any;
  dialogFilter = false;

  tableHeader = [
    {
      text: "Kelas",
      value: "product.productName",
      sortable: false,
    },
    {
      text: "Tanggal",
      value: "createDate",
      sortable: false,
    },
    {
      text: "Pembeli",
      value: "client.fullname",
      sortable: false,
    },
    {
      text: "Nominal Transaksi",
      value: "amount",
      sortable: false,
    },
    {
      text: "Status",
      value: "productTransactionStatus.productTransactionStatusName",
      sortable: false,
    },
    {
      text: "Aksi",
      value: "action",
      sortable: false,
    },
  ];

  dialogApprove = false;

  isLoadingApprove = false;

  formApprove = {
    productTransactionId: null,
    note: null,
  };

  onClickApprove(productTransactionId: any) {
    this.formApprove.productTransactionId = productTransactionId;
    this.dialogApprove = true;
  }

  onClickDetailProduct() {
    if (this.productTransactionDetail.product.status.statusId === 3) return;
    this.$router.push(
      "/product/" + this.productTransactionDetail.product.productId
    );
  }

  async onConfirmApprove() {
    this.isLoadingApprove = true;
    try {
      const resp = await this.productTransactionApi.approve(
        this.formApprove.productTransactionId,
        {
          note: this.formApprove.note,
        }
      );
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.$snackbar.open({
        text: "Berhasil menerima pesanan!",
      });
      this.fetchProductTransaction();
      this.dialogApprove = false;
      this.formApprove = {
        note: null,
        productTransactionId: null,
      };
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$snackbar.open({
        text: errorMessage,
      });
    } finally {
      this.isLoadingApprove = false;
    }
  }

  isLoadingUpdateStatus = false;

  async onClickUpdateStatus(id: any, statusId: any) {
    this.isLoadingUpdateStatus = true;
    try {
      const resp = await this.productTransactionApi.updateStatus(id, {
        productStatusId: statusId,
      });
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.$snackbar.open({
        text: "Berhasil!",
      });
      this.fetchProductTransaction();
      this.dialogDetail = false;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$snackbar.open({
        text: errorMessage,
      });
    } finally {
      this.isLoadingUpdateStatus = false;
    }
  }

  async onClickCancel(id: any) {
    try {
      const resp = await this.productTransactionApi.delete(id);
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.$snackbar.open({
        text: "Berhasil membatalkan!",
      });
      this.fetchProductTransaction();
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$snackbar.open({
        text: errorMessage,
      });
    } finally {
    }
  }

  dialogDetail = false;

  productTransaction = [] as any[];

  productTransactionDetail = null as any;

  $snackbar: any;

  isLoading = false;

  onPreviewProof(proofUrl: any) {
    window.open(proofUrl, "_blank");
  }

  async fetchProductTransaction() {
    this.isLoading = true;
    try {
      const resp = await this.productTransactionApi.get();
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.productTransaction = resp.data.data;
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

  async onClickDetail(id: any) {
    try {
      const resp = await this.productTransactionApi.getDetail(id);
      if (resp.data.status !== "SUCCESS") {
        this.$snackbar.open({
          text: resp.data.message,
        });
        return;
      }
      this.productTransactionDetail = resp.data.data;
      this.dialogDetail = true;
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
    this.fetchProductTransaction();
  }
}
</script>
