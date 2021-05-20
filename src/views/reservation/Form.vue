<template>
  <loading v-if="loading"/>
  <v-row v-else>
    <v-col cols="12" md="8" sm="12" style="position:relative">
      <v-card class="elevation-20">
        <v-card-title class="d-flex justify-space-between">
          <h4 class="text-uppercase font-weight-black">
            {{ edit ? "Actualizar reserva" : "Registrar reserva" }}
          </h4>
          <small
            style="font-size: 12px"
            class="text-decoration-underline red--text"
          >
            <b>( * ) Indica campo requerido</b>
          </small>
        </v-card-title>
        <v-form @submit.prevent="registerOrUpdate">
          <v-card-text>
            <v-row>
              <v-col cols="4" md="4" sm="4">
                <v-select
                  v-model="form.categoryName"
                  :items="categories"
                  item-text="name"
                  item-value="name"
                  :label="edit ? 'Categoria' : '* Categorias'"
                  placeholder="Seleccione la categoria"
                  @change="changeCategory()"
                  dense
                  outlined
                />
              </v-col>
              <v-col cols="4" md="4" sm="4">
                <v-select
                  v-model="form.roomNumber"
                  :items="rooms"
                  item-text="number"
                  item-value="number"
                  :label="edit ? 'habitacion' : '* habitaciones'"
                  placeholder="Seleccione la habitacion"
                  @change="changeRoom()"
                  dense
                  outlined
                  :error-messages="errors.room_number ? errors.room_number[0] : ''"
                />
              </v-col>
              <v-col cols="4" md="4" sm="4">
                <v-select
                  v-model="form.via"
                  :items="form.vias"
                  item-text="name"
                  item-value="value"
                  label="Reserva mediante"
                  placeholder="¿Por donde hace la reserva?"
                  dense
                  outlined
                  :error-messages="errors.via ? errors.via[0] : ''"
                />
              </v-col>
              <v-col cols="6" md="4" sm="4">
                <v-text-field
                  v-model="form.name"
                  label="* Nombres"
                  placeholder="Nombres"
                  outlined
                  dense
                  required
                  autocomplete="off"
                  :error-messages="errors.name ? errors.name[0] : ''"
                />
              </v-col>
              <v-col cols="6" md="4" sm="4">
                <v-text-field
                  v-model="form.lastName"
                  label="* Apellidos"
                  placeholder="Apellidos"
                  outlined
                  dense
                  required
                  autocomplete="off"
                  :error-messages="errors.last_name ? errors.last_name[0] : ''"
                />
              </v-col>
              <v-col cols="12" md="4" sm="4">
                <v-text-field
                  v-model="form.dni"
                  label="Dni 0 Pasaporte"
                  placeholder="Dni"
                  outlined
                  dense
                  required
                  autocomplete="off"
                  :error-messages="errors.dni ? errors.dni[0] : ''"
                />
              </v-col>
              <v-col cols="12" md="6" sm="12" class="py-0">
                <v-slider
                    class="pt-7"
                    v-model="form.persons"
                    label="N° de Personas"
                    min="1"
                    max="10"
                    thumb-label="always"
                    step="1"
                    ticks="always"
                    tick-size="3"
                    :error-messages="errors.persons ? errors.persons[0] : ''"
                  ></v-slider>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="form.phone"
                  label="Telefono"
                  placeholder="Telefono"
                  outlined
                  dense
                  required
                  autocomplete="off"
                  :error-messages="errors.phone ? errors.phone[0] : ''"
                />
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  placeholder="Correo Electronico"
                  outlined
                  dense
                  required
                  autocomplete="off"
                  :error-messages="errors.email ? errors.email[0] : ''"
                />
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="form.origin"
                  label="Procedencia"
                  placeholder="Lugar de Origin"
                  outlined
                  dense
                  required
                  autocomplete="off"
                  :error-messages="errors.origin ? errors.origin[0] : ''"
                />
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <date-and-time
                  :date="form.entryDate"
                  :error="errors.entry_date ? errors.entry_date[0] : ''"
                  label="* Fecha de Entrada"
                  @throw-arrow="form.entryDate2 = $event"
                />
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <date-and-time
                  :date="form.departureDate"
                  :error="
                    errors.departure_date ? errors.departure_date[0] : ''"
                  label="* Fecha de Salida"
                  @throw-arrow="form.departureDate2 = $event"
                />
              </v-col>
              <v-col cols="12" md="12" sm="12">
                <v-textarea
                  v-model="form.message"
                  rows="3"
                  label="Mensaje"
                  placeholder="Mensaje..."
                  outlined
                  name="input-7-4"
                  required
                  :error-messages="errors.message ? errors.message[0] : ''"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="py-0">
            <v-spacer />
            <div class="d-flex justify-end">
              <btn-router route="reservations" text="Volver" />
              <v-btn
                type="submit"
                class="font-weight-black"
                :color="edit ? 'warning' : 'green'"
                text
              >
                {{ edit ? "Actualzar" : "Reservar" }}
              </v-btn>
            </div>
          </v-card-actions>
        </v-form>
      </v-card>
      <button
        v-if="edit"
        style="position: absolute; bottom: 20px;left:23px"
        class="badge badge-pill badge-danger shadow-danger m-1 my-button"
        @click="selectDeleteReservation()"
      >
        Eliminar Reserva
      </button>
    </v-col>
    <v-col cols="12" md="4" sm="12">
      <transition name="slide-fade">
        <tarifa-room
          :entry-date="form.entryDate2"
          :departure-date="form.departureDate2"
          :real-time-date="realTimeDate"
        />
      </transition>
    </v-col>

    <modal-warning
      :text="`¿Desea Eliminar la reserva de ${reservation.name}?`"
      text-btn="Eliminar"
    />
  </v-row>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { EventBus } from "@/Event.js";
import moment from "moment";

export default {
  components: {
    Loading: () => import("@/components/common/Loading"),
    BtnRouter: () => import("@/components/ui/BtnRouter"),
    TarifaRoom: () => import("@/components/common/TarifaRoom"),
    DateAndTime: () => import("@/components/ui/DateAndTime"),
    ModalWarning: () => import("@/components/common/ModalWarning"),
  },
  data() {
    return {
      loading: true,
      edit: false,
      realTimeDate: false,
      form:{
        id: "",
        categoryName: "",
        roomNumber: "",
        name: "",
        lastName: "",
        dni: "",
        phone: "",
        persons: 1,
        email: "",
        origin: "",
        message: "",
        entryDate: "",
        entryDate2: "",
        departureDate: "",
        departureDate2: "",
        via: "",
        vias: [
          { name: "LLAMADA", value: "call" },
          { name: "WHATSAPP", value: "whatsapp" },
          { name: "FACEBOOK", value: "facebook" },
          { name: "OTROS", value: "other" },
        ],
      },
    };
  },
  computed: {
    ...mapState("categories", ["categories", "rooms"]),
    ...mapState("reservation", ["reservation", "errors"]),
  },
  async created() {
    this.cleanErrors();
    this.form.entryDate = moment().format("YYYY-MM-DD HH:mm:ss");
    await this.getAllCategories();

    if (this.$route.params.id) {
      this.edit = true;
      await this.getReservationById(this.$route.params.id);

      this.form.id = this.reservation.id;
      this.form.categoryName = this.reservation.category.name;
      this.form.roomNumber = this.reservation.room_number;
      this.form.name = this.reservation.name;
      this.form.lastName = this.reservation.last_name;
      this.form.dni = this.reservation.dni;
      this.form.phone = this.reservation.phone;
      this.form.persons = this.reservation.persons;
      this.form.email = this.reservation.email;
      this.form.origin = this.reservation.origin;
      this.form.message = this.reservation.message;
      this.form.entryDate = this.reservation.entry_date;
      this.form.departureDate = this.reservation.departure_date;
      this.form.via = this.reservation.via;
      await this.getAllRoomsByCategory(this.reservation.category.name);
      await this.getRoomByNumber(this.form.roomNumber);
    } else {
      this.CLEAN_ROOM()
    }

    this.loading = false;

    EventBus.$on("the-user-confirm-the-warning-modal", this.delete);
  },
  methods: {
    ...mapActions("categories", ["getAllCategories", "getAllRoomsByCategory"]),
    ...mapActions("reservation", [
      "registerReservation",
      "updateReservation",
      "getReservationById",
      "deleteReservation",
      "cleanErrors",
    ]),
    ...mapActions("snackbar", ["showSnackbar"]),
    ...mapActions("rooms", ["getRoomByNumber"]),
    ...mapActions("dialog", ["openDialogWarning"]),
    ...mapMutations("rooms", ["CLEAN_ROOM"]),


    async registerOrUpdate() {
      this.cleanErrors();

      const params = {
        room_number: this.form.roomNumber,
        via: this.form.via,
        persons: this.form.persons,
        name: this.form.name,
        last_name: this.form.lastName,
        dni: this.form.dni,
        phone: this.form.phone,
        email: this.form.email,
        entry_date: this.form.entryDate2,
        departure_date: this.form.departureDate2,
        origin: this.form.origin,
        message: this.form.message,
      };

      console.log(params)
      if (this.edit) {
        await this.updateReservation({ id: this.form.id, reservation: params });
      } else {
        await this.registerReservation(params);
      }

      if (this.errors.length === 0) {
        this.showSnackbar({
          color: "success",
          msg: "Acción realizada con exito!",
        });
        if (!this.edit) {
          this.$router.push({ name: "reservation" });
        }
      } else {
        this.showSnackbar({
          color: "error",
          msg: "No se pudo realizar la acción!",
        });
      }
    },
    async changeCategory() {
      await this.getAllRoomsByCategory(this.form.categoryName);
    },
    async changeRoom() {
      await this.getRoomByNumber(this.form.roomNumber);
    },
    selectDeleteReservation() {
      this.openDialogWarning(true);
    },
    async delete() {
      await this.deleteReservation(this.reservation.id);
      this.openDialogWarning(false);
      if (this.reservation) {
        this.$router.push({ name: "reservation" });
      } else {
        this.showSnackbar({
          color: "error",
          msg: "No se puedo realizar la acción",
        });
      }
    },
  },
};
</script>

<style>
.editable {
  padding: 12px 6px !important;
}
</style>
