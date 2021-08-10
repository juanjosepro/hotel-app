<template>
  <div v-if="loading">
    <v-card class="elevation-20" style="height: 650px">
      <v-card-title>
        <h5>ESTADO ACTUAL DE LAS HABITACIONES</h5>
      </v-card-title>
      <v-card-text>
        <pie-chart
          :styles="styles"
          :chart-options="chartOptions"
          :chart-data="pieChartData"
        />
      </v-card-text>
      <v-card-actions>
        <div class="d-flex flex-column" style="width: 100%">
          <ul style="padding-left: 0; margin-bottom: 0; margin-top: 0">
            <li
              class="d-flex justify-space-between"
              style="
                border-bottom: 1px solid rgba(0, 0, 0, 0.125);
                padding: 0.5rem 1rem;
                font-size: 14px;
                color: #4c5258;
              "
              v-for="(status, i) in data"
              :key="i"
            >
              {{ nameStatusRoom[i] }}
              <v-chip class="text-white" :color="primaryColors[i]" x-small>
                {{ status.count }}
              </v-chip>
            </li>
          </ul>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { _axios } from "@/plugins/axios";

export default {
  components: {
    PieChart: () => import("@/components/chart/PieChart.vue"),
  },
  data: () => ({
    loading: false,
    data: null,
    nameStatusRoom: [
      "Total habitaciones",
      "Disponibles",
      "Ocupadas",
      "Limpieza",
      "mantenimiento",
      "Inhabilitado",
    ],
    primaryColors: [
      "#01579B",
      "#4CAF50",
      "#ee0979",
      "#00CAE3",
      "#F57C00",
      "#000000",
    ],
    pieChartData: null,
    styles: {
      height: "250px",
      width: "100%",
      position: "relative",
    },
    chartOptions: {
      maintainAspectRatio: false,
    },
  }),
  async created() {
    await this.getRoomsStatus();
    this.loading = true;
  },
  methods: {
    async getRoomsStatus() {
      try {
        const res = await _axios.get("get-rooms-status");
        this.data = res.data;

        let labels = [];
        let colors = [];
        let datasetsData = [];
        let index = 0;
        res.data.map((data, i) => {
          if (index) {
            labels.push(this.nameStatusRoom[i]);
            colors.push(this.primaryColors[i]);
            datasetsData.push(data.count);
          }
          index++;
        });
        this.pieChartData = {
          labels: labels,
          datasets: [
            {
              label: "Estado de las habitaciones",
              backgroundColor: colors,
              data: datasetsData,
            },
          ],
        };
      } catch (error) {
        console.error(error.message);
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