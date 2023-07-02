<template>
  <div class="w-full d-flex flex-column">
    <v-card
      elevation="0"
      rounded="lg"
      style="height: 40vh"
      class="d-flex justify-center align-center"
      color="grey lighten-3"
    >
      <v-icon size="80" color="grey lighten-1"> mdi-image </v-icon>
    </v-card>
    <v-btn block color="primary" outlined class="mt-4" depressed
      >Ubah Gambar</v-btn
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class CommonImageDropzone extends Vue {}
</script>
