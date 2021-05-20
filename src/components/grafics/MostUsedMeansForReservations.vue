<template>
  <div
    class="d-flex justify-space-between align-content-space-between flex-wrap p-0 m-0"
    style="width: 100%;"
  >
    <v-card
      style="width:92px; margin-top:10px!important"
      class="elevation-20 knob-control-container m-card-border"
      v-for="(status, i) in data"
      :key="i"
    >
      <v-card-text>
        <knob-control
          :primary-color="primaryColors[i]"
          :secondary-color="secondaryColors[i]"
          text-color="#000000"
          v-model="status.count"
          :size="60"
        />
        <h6 class="text-uppercase">{{ nameVia[i] }}</h6>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import KnobControl from "vue-knob-control";
import { _axios } from "@/plugins/axios";

export default {
  components: {
    KnobControl,
  },
  data: () => ({
    data: null,
    nameVia: ["Hotel", "Web", "LLamada", "Whatsapp", "Facebook", "Otros"],
    primaryColors: [
      "#01579B",
      "#4CAF50",
      "#ee0979",
      "#00CAE3",
      "#F57C00",
      "#000000",
      "#FDD835",
      "#263238",
      "#64DD17",
      "#AEEA00",
      "#827717",
      "#004D40",
      "#2962FF",
      "#6200EA",
      "#AA00FF",
      "#880E4F",
      "#9C27B0",
      "#E91E63",
    ],
    secondaryColors: [
      "#a8bdce",
      "#9fdaa1",
      "#E7B6DC",
      "#addfe6",
      "#e9bd91",
      "#8b8787",
    ],
  }),
  async created() {
    await this.getTheMostUsedMeansForReservations();
    this.loading = true;
  },
  methods: {
    async getTheMostUsedMeansForReservations() {
      try {
        const res = await _axios.get(
          "get-the-most-used-means-for-reservations"
        );
        this.data = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.knob-control-container {
  text-align: center;
}
.m-card-border {
  border-radius: 10px !important;
}
</style>