<template>
  <loading v-if="loading"/>
  <v-row v-else>
    <v-col cols="12">
      <v-card class="elevation-15">
        <v-card-title>
          <router-link :to="{ name: 'reservation.create' }" class="mr-4">
            <button
              class="badge badge-pill badge-success shadow-success m-1 my-button"
            >
              Registrar nueva Reserva
            </button>
          </router-link>
          <router-link :to="{ name: 'reservations' }" class="mr-4">
            <button
              class="badge badge-pill badge-primary shadow-primary m-1 my-button"
            >
              Ver reservas en modo Calendario
            </button>
          </router-link>
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
            :items="reservations"
            :search="search"
            sort-by="reservation.name"
            locale="es"
            :loading="loading"
            loading-text="cargando..."
            no-results-text="No se encontraron coincidencias..."
            no-data-text="Sin datos que mostrar..."
          >
            <template v-slot:[`item.tools`]="{ item }">
              <router-link :to="{ name: 'reservation.update', params: {id: item.id} }">
                <v-icon small class="mr-2">
                  mdi-eye-plus
                </v-icon>
              </router-link>
              <v-icon small @click="selectDeleteReservation(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>

      <modal-warning
        :text="`¿Desea Eliminar la reserva de ${reservation.name}?`"
        text-btn="Eliminar"
      />
    </v-col>
  </v-row>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { EventBus } from "@/Event.js";

  export default {
    components: {
      ModalWarning: () => import("@/components/common/ModalWarning"),
      Loading: () => import("@/components/common/Loading"),
    },
    data () {
      return {
        loading: true,
        reservation: {},
        loadingMsg: "",
        search: "",
        headers: [
          { text: "Categoria", value: "category.name" },
          { text: "Nombre", value: "name" },
          { text: "Apellidos", value: "last_name" },
          { text: "Fecha Entrada", value: "entry_date" },
          { text: "Fecha Salida", value: "departure_date" },
          { text: "Acciones", value: "tools" },
        ],
      }
    },
    computed: {
      ...mapState('reservation', ['reservations']),
    },
    async created () {
      await this.getAllReservation()
      this.loading = false
      EventBus.$on("the-user-confirm-the-warning-modal", this.delete);
    },
    methods: {
      ...mapActions('reservation', ['getAllReservation', 'deleteReservation']),
      ...mapActions("dialog", ["openDialogWarning", "openDialogForm"]),
      ...mapActions("snackbar", ["showSnackbar"]),

      selectDeleteReservation(reservation){
        this.reservation = reservation
        this.openDialogWarning(true);
      },
      async delete() {
        await this.deleteReservation(this.reservation.id);
        this.showSnackbar({
          color: "success",
          msg: "Acción realizada con exito!",
        });
        this.openDialogWarning(false);
      },
    },
  }
</script>
