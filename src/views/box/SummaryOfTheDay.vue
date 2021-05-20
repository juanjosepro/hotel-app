<template>
  <v-row>
    <v-col cols="12" sm="12" md="12">
      <v-card class="elevation-20">
        <v-card-title>
          <h4 class="text-uppercase font-weight-black">RESUMEN DE CAJA DEL DIA {{paramName}}</h4>
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
            :items="summaryBox"
            :search="search"
            sort-by="date"
          >
            <template v-slot:[`item.tools`]="{ item }">
              <small style="cursor: pointer" @click="selectGuest(item)">Ver mas</small>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <modal-view-data :details="details"/>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from 'moment'

export default {
  components: {
    ModalViewData: () => import("./ViewData")
  },
  data() {
    return {
      search: '',
      headers: [
        { text: 'Categoria', value: 'guest.room.category.name' },
        { text: 'N° de habitación', value: 'guest.room.number' },
        { text: 'Nombre del Huesped', value: 'guest.name' },
        { text: 'Apellidos', value: 'guest.last_name' },
        { text: 'Dias de estadia', value: 'days' },
        { text: 'Monto por dias', value: 'amount' },
        { text: 'Acciones', value: 'tools' },
      ],
      details: {},
      paramName: null
    };
  },
  computed: {
    ...mapState('loading', ['loading', 'loadingMsg']),
    ...mapState('box', ['summaryBox', 'guestDetails']),
  },
  async created() {
    this.paramName = moment(this.$route.params.date).format("LL")
    await this.getCashDetailsByDate(this.$route.params.date);
  },
  methods: {
    ...mapActions('box', ['getCashDetailsByDate']),
    ...mapActions('dialog', ['openDialogForm']),

    selectGuest (item) {
        this.openDialogForm(true)
        this.details = item
      },
  },
};
</script>

<style>
</style>
