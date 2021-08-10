<template>
  <v-container id="dashboard" fluid tag="section">
    <loading v-if="loading"/>
    <v-row v-else>
      <v-col cols="12" sm="12" md="4">
        <room-status />
      </v-col>
      <v-col cols="12" sm="12" md="8">
        <v-row>
          <v-col cols="12" sm="12" md="12" class="pt-0">
            <v-card v-if="!loading" class="elevation-20">
              <v-card-title>
                <h5>GANANCIAS POR MES</h5>
              </v-card-title>
              <v-card-text>
                <line-chart
                  :styles="stylesLine"
                  :chart-data="lineChartData"
                  :chart-options="chartOptions"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-card class="elevation-20">
              <v-card-title>
                <h5>CATEGORIAS MAS USADAS</h5>
              </v-card-title>
              <v-card-text>
                <doughnut-chart
                  :styles="stylesDoughnut"
                  :chart-data="doughnutChartData"
                  :chart-options="chartOptions"
                />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-card class="elevation-20" style="min-height:200px">
              <v-card-title>
                <h5>MEDIO POR EL QUE HACEN MAS RESERVAS</h5>
              </v-card-title>
              <v-card-text>
                <most-used-means-for-reservations />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { _axios } from "@/plugins/axios";
import moment from "moment";

export default {
  components: {
    Loading: () => import("@/components/common/Loading"),
    RoomStatus: () => import("@/components/grafics/RoomStatus.vue"),
    DoughnutChart: () => import("@/components/chart/DoughnutChart.vue"),
    PieChart: () => import("@/components/chart/PieChart.vue"),
    LineChart: () => import("@/components/chart/LineChart.vue"),
    MostUsedMeansForReservations: () => import("@/components/grafics/MostUsedMeansForReservations.vue"),
  },
  data() {
    return {
      loading: true,
      stylesLine: {
        height: "300px",
        width: "100%",
        position: "relative",
      },
      stylesDoughnut: {
        height: "220px",
        width: "100%",
        position: "relative",
      },
      chartOptions: {
        maintainAspectRatio: false,
      },
      doughnutChartData: null,
      lineChartData: null,
      nameStatusRoom: [
        "Total",
        "Disponibles",
        "Ocupadas",
        "Limpieza",
        "mantenimiento",
        "Inhabilitado",
      ],
      colors: [
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
    };
  },
  async created() {
    await this.getMostUsedRooms();
    await this.getASumOfMoneyPerMonth();
    this.loading = false;
  },
  methods: {
    async getMostUsedRooms() {
      try {
        const res = await _axios.get("get-most-used-rooms");
        let labels = [];
        let datasetsData = [];
        res.data.map((data) => {
          labels.push(data.name);
          datasetsData.push(data.most_used);
        });

        this.doughnutChartData = {
          labels: labels,
          datasets: [
            {
              label: "Habitaciones mas Usadas",
              backgroundColor: this.uniqueColors(datasetsData.length),
              data: datasetsData,
            },
          ],
        };
      } catch (error) {
        console.error(error.message);
      }
    },
    uniqueColors(count) {
      let cls = [];
      let contador = 0;
      do {
        for (let index = 0; index < count; index++) {
          cls.push(this.colors[Math.round(Math.random() * count)]);
        }
        const colorsUnique = new Set(cls);
        cls = [...colorsUnique];
        contador = cls.length;
      } while (contador < count);

      return cls;
    },
    async getASumOfMoneyPerMonth() {
      try {
        const res = await _axios.get("get-a-sum-of-money-per-month");
        let labels = [];
        let datasetsData = [];
        res.data.map((data) => {
          const date = moment(new Date(data.date)).format("MMMM YYYY");
          labels.push(date);
          datasetsData.push(data.amount.split(',').join(''));
        });
        this.lineChartData = {
          labels: labels,
          datasets: [
            {
              label: "Ganancias por mes",
              data: datasetsData,
              fill: true,
              borderColor: "rgb(207, 37, 250)",
              tension: 0.2,
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

<style lang="scss">
.color {
  background: #fff;
}
.colorasdasd {
  background: rgb(207, 37, 250);
}
</style>