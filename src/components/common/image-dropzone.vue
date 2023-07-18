<template>
  <v-card
    elevation="0"
    rounded="0"
    outlined
    style="height: 40vh"
    class="d-flex justify-center flex-column align-center"
  >
    <div style="height: 32vh;" class="d-flex w-full justify-center align-center">
      <img v-if="field !== null" style="height: 28vh" :src="field" alt="" />
      <v-icon v-if="field === null" size="70" color="grey lighten-2"
        >mdi-image-plus-outline</v-icon
      >
    </div>
    <input
      ref="hiddenFilePicker"
      style="display: none"
      type="file"
      @input="onInputImage"
      :multiple="false"
      accept=".png,.jpg,.jpeg"
    />

    <div
      style="border-top: 0.5px solid rgb(210, 210, 210)"
      class="d-flex pa-2 w-full"
    >
      <v-btn
        @click="onClickSelectImage"
        small
        depressed
        block
        color="primary"
        >{{ field === null ? "Pilih Gambar" : "Ubah Gambar" }}</v-btn
      >
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { getApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

@Component
export default class CommonImageDropzone extends Vue {
  $refs: any;

  @Prop()
  value!: any;

  get field() {
    return this.value;
  }

  set field(value: any) {
    this.$emit("input", value);
  }

  onClickSelectImage() {
    const fileupload = this.$refs.hiddenFilePicker as HTMLElement;
    if (fileupload) {
      fileupload.click();
    }
  }

  $helpers: any;

  $snackbar: any;

  async onInputImage(event: any) {
    const val = event.target.files[0];
    try {
      const app = getApp();
      const storage = getStorage(app, "gs://p2p-commerce.appspot.com");
      const storageRef = ref(storage, `${this.$helpers.generateUUID()}`);
      await uploadBytes(storageRef, val);
      const cb = await getDownloadURL(storageRef);
      this.field = cb;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$snackbar.open({
        text: errorMessage,
      });
    }
  }
}
</script>
