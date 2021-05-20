<template>
<loader v-if="loading"/>
  <v-row v-else>
    <v-col cols="12" sm="4" md="4">
      <base-material-stats-card
        color="info"
        icon="mdi-poll"
        :title="currentDate"
        :value="box.boxToday.totaldailyamount"
        sub-icon="mdi-account-cash"
        sub-text="Monto recaudado el dia de hoy."
        class="mb-10 elevation-10"
      />
      <base-material-stats-card
        color="primary"
        icon="mdi-cash-lock"
        :title="currentDate"
        :value="box.boxTotal.totalamount"
        sub-icon="mdi-account-cash"
        sub-text="Monto recaudado hasta la fecha actual."
        class="elevation-10"
      />
    </v-col>
    <v-col cols="12" sm="8" md="8">
      <v-card class="elevation-20">
        <v-card-title>
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            single-line
            hide-details
            style="max-width: 220px"
            placeholder="Buscar"
            outlined
            dense
          />
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="boxes"
            :search="search"
            sort-by="date"
            locale="es"
            :loading="loading"
            loading-text="Cargando datos..."
            no-results-text="No se encontraron coincidencias..."
            no-data-text="Sin datos que mostrar..."
          >
            <template v-slot:[`item.tools`]="{ item }">
              <router-link
                :to="{
                  name: 'box.summary',
                  params: { date: item.date },
                }"
                class="black--text"
              >
                <small>Ver resumen del dia...</small>
              </router-link>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  components:{
    Loader: () => import("@/components/common/Loading")
  },
  data() {
    return {
      search: "",
      loading: true,
      headers: [
        { text: "Total dia", value: "amount" },
        { text: "Fecha del monto", value: "dateFormater" },
        { text: "Acciones", value: "tools" },
      ],
    };
  },
  computed: {
    ...mapState("box", ["boxes", "box"]),

    currentDate() {
      return moment().format("LL hh:mm A");
    },
  },
  async created() {
    await this.getAllBoxes();
    await this.getDailyCheck();
    this.loading= false
  },
  methods: {
    ...mapActions("box", ["getAllBoxes", "getDailyCheck"]),
  },
};
</script>

<style>
</style>
