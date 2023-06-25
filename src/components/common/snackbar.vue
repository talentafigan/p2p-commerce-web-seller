<template>
  <v-snackbar v-model="show" bottom right>
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="onClose"> Tutup </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

@Component
export default class CommonSnackbar extends Vue {
  @Prop({ type: String })
  text!: string;

  $el: any;

  show = false;

  onClose() {
    this.show = false;
    this.destroySnackbar();
  }

  mounted() {
    this.show = true;
  }

  destroySnackbar() {
    this.$destroy();
    this.$el.remove();
  }
}
</script>
