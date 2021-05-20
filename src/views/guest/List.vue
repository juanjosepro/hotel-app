<template>
  <loading v-if="loading"/>
  <v-row v-else>
    <v-col cols="12">
      <v-card class="elevation-20">
        <v-card-title>
          <h4 class="font-weight-black">LISTA DE HUESPEDES</h4>
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
            :items="guests"
            :search="search"
            locale="es"
            :loading="loading"
            loading-text="Cargando datos..."
            no-results-text="No se encontraron coincidencias..."
            no-data-text="Sin datos que mostrar..."
          >
            <template v-slot:[`item.tools`]="{ item }">
              <v-icon small class="mr-2" @click="selectGuest(item.id)">
                mdi-account-search
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>

      <!-- Modal to see a guest -->
      <modal-form />
      
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  components: {
    Loading: () => import("@/components/common/Loading"),
    ModalForm: () => import("./ModalForm"),
  },
  data() {
    return {
      loading: true,
      search: "",
      headers: [
        {
          text: "Habitacion",
          value: "room.attributes.category.attributes.name",
        },
        { text: "N° de Habitacion", value: "room_number" },
        { text: "Nombres", value: "name" },
        { text: "Apellidos", value: "last_name" },
        { text: "Dni", value: "dni" },
        { text: "Telefono", value: "phone" },
        { text: "Personas", value: "persons" },
        { text: "Estado", value: "status" },
        { text: "Acciones", value: "tools" },
      ],
      guest: {},
    };
  },
  computed: {
    ...mapState("guest", ["guests"]),
    ...mapGetters("guest", ["getGuest"]),
  },
  async created() {
    await this.getAllGuests();
    this.loading = false
  },
  methods: {
    ...mapActions("guest", ["getAllGuests"]),
    ...mapActions("dialog", ["openDialogForm"]),

    selectGuest(id) {
      this.openDialogForm(true);
      this.getGuest(id);
    },
  },
};
</script>

<style>
</style>
