<template>
  <loading v-if="loading"/>
  <v-row v-else>
    <modal-form @create="create" @update="update" />
    <v-col cols="12">
      <v-card class="elevation-20">
        <v-card-title>
          <div class="m-card-title">
            <div class="m-card-item1">
              <v-btn color="success" mediun @click="openDialog()">
                Registrar
              </v-btn>
              <v-select
                v-model="status"
                :items="transStatus"
                item-text="text"
                item-value="value"
                label="¿Que estado de habitación desea ver?"
                dense
                @change="changeRooms()"
                outlined
                class="ml-2"
              />
            </div>
            <div class="m-card-item2">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                single-line
                hide-details
                style="width: 100%"
                placeholder="Buscar"
                outlined
                dense
              />
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="transRooms"
            :search="search"
            sort-by="category.name"
            locale="es"
            :loading="loading"
            loading-text="Cargando datos..."
            no-results-text="No se encontraron coincidencias..."
            no-data-text="Sin datos que mostrar..."
          >
            <template v-slot:[`item.tools`]="{ item }">
              <v-chip
                @click="openDialog(item.number)"
                small
                class="ma-2"
                color="warning"
                outlined
                pill
              >
                Editar
                <v-icon right> mdi-pencil </v-icon>
              </v-chip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Loading: () => import("@/components/common/Loading"),
    ModalForm: () => import("./ModalForm"),
  },
  data() {
    return {
      loading: true,
      search: "",
      status: "",
      headers: [
        { text: "Categoria", value: "category.attributes.name" },
        { text: "Número", value: "number" },
        { text: "Nivel", value: "level" },
        { text: "Ubicación", value: "location" },
        { text: "Estado", value: "status" },
        { text: "Acciones", value: "tools" },
      ],
    };
  },
  computed: {
    ...mapState("rooms", ["rooms", "errors"]),

    transStatus() {
      return [
        { text: this.$t("all"), value: "" },
        { text: this.$t("available"), value: "available" },
        { text: this.$t("occupied"), value: "occupied" },
        { text: this.$t("maintenance"), value: "maintenance" },
        { text: this.$t("cleaning"), value: "cleaning" },
        { text: this.$t("disabled"), value: "disabled" },
      ];
    },
    transRooms() {
      const rooms = this.rooms.map((room) => {
        room.status = this.$t(room.status);
        return room;
      });

      return rooms;
    },
  },
  async created() {
    await this.getAllRooms();

    //saved in reception view to change the status of a specific room
    const getNumber = localStorage.getItem("roomNumber");
    if (getNumber) {
      this.search = getNumber
      localStorage.removeItem("roomNumber")
    }

    this.loading = false
  },
  methods: {
    ...mapActions("rooms", [
      "createRoom",
      "updateRoom",
      "cleanErrors",
      "getAllRooms",
      "getRoomByNumber",
    ]),
    ...mapActions("dialog", ["openDialogWarning", "openDialogForm"]),
    ...mapActions("snackbar", ["showSnackbar"]),

    async update(data) {
      this.cleanErrors();
      await this.updateRoom(data);
      if (!this.existsErrors()) {
        await this.getAllRooms(data.room.status);
      }
    },
    async create(data) {
      this.cleanErrors();
      await this.createRoom(data);
      this.existsErrors();
    },
    async changeRooms() {
      await this.getAllRooms(this.status);
    },
    existsErrors() {
      if (this.errors.length === 0) {
        this.openDialogForm(false);
        this.showSnackbar({
          color: "success",
          msg: "Acción realizada con exito!",
        });
        return false;
      } else {
        this.showSnackbar({
          color: "error",
          msg: "No se pudo realizar la acción!",
        });
        return true;
      }
    },
    async openDialog(number = "") {
      this.cleanErrors();
      this.openDialogForm(true);
      if (number !== "") await this.getRoomByNumber(number);
    },
  },
};
</script>
<style scoped>
.m-card-title{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.m-card-item1 {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 730px) {
  .m-card-title {
    flex-direction: column;
  }
  .m-card-item2 {
    width: 100%;
  }
}
</style>