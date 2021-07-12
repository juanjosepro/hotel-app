<template>
  <loading v-if="loading" />
  <div v-else>
    <v-row>
      <v-col cols="12" md="8" sm="8" style="position: relative">
        <v-card class="elevation-20">
          <v-card-title class="d-flex justify-space-between">
            <h4 class="text-uppercase font-weight-black">Datos del Huesped</h4>
            <small
              style="font-size: 12px"
              class="text-decoration-underline red--text"
            >
              <b>( * ) Indica campo requerido</b>
            </small>
          </v-card-title>
          <v-form @submit.prevent="update">
            <v-card-text>
              <v-row>
                <v-col cols="6" md="4" sm="4">
                  <v-text-field
                    v-model="form.guestName"
                    label="* Nombres"
                    outlined
                    dense
                    required
                    :error-messages="errors.name ? errors.name[0] : ''"
                  />
                </v-col>
                <v-col cols="6" md="4" sm="4">
                  <v-text-field
                    v-model="form.guestLastName"
                    label="* Apellidos"
                    outlined
                    dense
                    required
                    :error-messages="
                      errors.last_name ? errors.last_name[0] : ''
                    "
                  />
                </v-col>
                <v-col cols="6" md="4" sm="4">
                  <v-text-field
                    v-model="form.guestDni"
                    label="* Dni 0 Pasaporte"
                    outlined
                    dense
                    required
                    :error-messages="errors.dni ? errors.dni[0] : ''"
                  />
                </v-col>
                <v-col cols="6" md="4" sm="4">
                  <v-text-field
                    v-model="form.guestPhone"
                    label="Telefono"
                    outlined
                    dense
                    required
                    :error-messages="errors.phone ? errors.phone[0] : ''"
                  />
                </v-col>
                <v-col cols="12" md="8" sm="8">
                  <v-text-field
                    v-model="form.guestOrigin"
                    label="* Procedencia"
                    outlined
                    dense
                    required
                    :error-messages="errors.origin ? errors.origin[0] : ''"
                  />
                </v-col>
                <v-col cols="12" md="6" sm="6">
                  <v-text-field
                    v-model="form.guestEmail"
                    label="Email"
                    outlined
                    dense
                    required
                    :error-messages="errors.email ? errors.email[0] : ''"
                  />
                </v-col>
                <v-col cols="12" md="6" sm="6">
                  <v-text-field
                    v-model="form.guestVia"
                    label="Medio por el que iso la reserva"
                    outlined
                    dense
                    disabled
                    :error-messages="errors.origin ? errors.origin[0] : ''"
                  />
                </v-col>
                <v-col cols="12" md="6" sm="12" class="py-0">
                  <v-slider
                    class="pt-7"
                    v-model="form.guestPersons"
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
                <v-col cols="12" md="6" sm="12">
                  <date-and-time
                    :date="form.guestDepartureDate"
                    :error="
                      errors.departure_date ? errors.departure_date[0] : ''
                    "
                    label="Fecha de Salida"
                    @throw-arrow="form.guestDepartureDate2 = $event"
                  />
                </v-col>
                <v-col cols="12" md="12" sm="12">
                  <v-textarea
                    v-model="form.guestMessage"
                    rows="3"
                    label="Mensaje"
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
                <btn-router route="reception" text="Volver" />
                <v-btn
                  type="submit"
                  class="font-weight-black"
                  color="warning darken-1"
                  text
                >
                  Actualizar
                </v-btn>
              </div>
            </v-card-actions>
          </v-form>
        </v-card>
        <button
          style="position: absolute; bottom: 20px; left: 23px"
          class="badge badge-pill badge-danger shadow-danger m-1 my-button"
          @click="question()"
        >
          Liberar Habitación
        </button>
        <a
          :href="routeForPDF"
          target="_blank"
          style="padding:4px 10px; position: absolute; bottom: 23px; left: 180px; text-decoration:none"
          class="badge badge-pill badge-danger shadow-danger my-button white--text"
        >
          Generar PDF <v-icon class="white--text"> mdi-download </v-icon>
        </a>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <transition name="slide-fade">
          <tarifa-room
            :departure-date="form.guestDepartureDate2"
            :entry-date="form.guestEntryDate"
            :real-time-date="realTimeDate"
          />
        </transition>
      </v-col>
    </v-row>

    <modal-warning
      :text="`¿Desea liberar la habitacion con número ${room.number}?`"
      text-btn="Liberar"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { EventBus } from "@/Event.js";

export default {
  components: {
    Loading: () => import("@/components/common/Loading"),
    BtnRouter: () => import("@/components/ui/BtnRouter"),
    DateAndTime: () => import("@/components/ui/DateAndTime"), // al parecer no carga los datos rapidos
    TarifaRoom: () => import("@/components/common/TarifaRoom"),
    ModalWarning: () => import("@/components/common/ModalWarning"),
  },
  data() {
    return {
      loading: true,
      realTimeDate: false,
      pathParameter: "",
      routeForPDF: "",
      form: {
        guestId: 0,
        guestName: "",
        guestLastName: "",
        guestDni: "",
        guestPhone: "",
        guestEmail: "",
        guestOrigin: "",
        guestPersons: 1,
        guestMessage: "",
        guestVia: "",
        guestStatus: "",
        guestEntryDate: "",
        guestDepartureDate: "",
        guestDepartureDate2: "",
      },
    };
  },
  computed: {
    ...mapState("reception", ["errors", "guest"]),
    ...mapState("rooms", ["room"]),
  },
  async created() {
    this.cleanErrors();
    this.pathParameter = this.$route.params.number;

    if (this.pathParameter) {
      await this.getRoomByNumber(this.pathParameter);
      //if the room does not exist with the NUMBER entered by keyboard in the url
      if (!this.room.number) {
        return this.$router.go(-1)
      }

      await this.getGuest(this.pathParameter);

<<<<<<< HEAD
      this.routeForPDF = process.env.VUE_APP_APIURL + 'generate-pdf/' + this.pathParameter
=======
      this.routeForPDF = process.env.VUE_APP_APIURL + `/generate-pdf/${this.pathParameter}`
>>>>>>> 63eda9da4ff9645d1300f8eb1fe61a1c2ac782df
      this.realTimeDate = true;
    } else {
      location.href = "/";
    }

    EventBus.$on("the-user-confirm-the-warning-modal", this.freeRooms);
  },
  methods: {
    ...mapActions("rooms", ["getRoomByNumber"]),
    ...mapActions("reception", [
      "updateGuest",
      "cleanErrors",
      "moreInformationAboutTheGuest",
      "freeRoom",
    ]),
    ...mapActions("dialog", ["openDialogWarning"]),
    ...mapActions("snackbar", ["showSnackbar"]),
    ...mapActions("notification", ["removeNotification"]),

    async getGuest(number) {
      await this.moreInformationAboutTheGuest(number);
      this.form.guestId = this.guest.id;
      this.form.guestName = this.guest.name;
      this.form.guestLastName = this.guest.last_name;
      this.form.guestDni = this.guest.dni;
      this.form.guestPhone = this.guest.phone;
      this.form.guestEmail = this.guest.email;
      this.form.guestPersons = this.guest.persons;
      this.form.guestStatus = this.guest.status;
      this.form.guestMessage = this.guest.message;
      this.form.guestOrigin = this.guest.origin;
      this.form.guestVia = this.guest.via;

      this.form.guestEntryDate = this.guest.entry_date;
      this.form.guestDepartureDate = this.guest.departure_date;
      this.loading = false;
    },
    async update() {
      this.cleanErrors();

      const params = {
        room_number: this.room.number,
        name: this.form.guestName,
        last_name: this.form.guestLastName,
        dni: this.form.guestDni,
        phone: this.form.guestPhone,
        persons: this.form.guestPersons,
        origin: this.form.guestOrigin,
        email: this.form.guestEmail,
        entry_date: this.form.guestEntryDate,
        departure_date: this.form.guestDepartureDate2,
        message: this.form.guestMessage,
      };

      await this.updateGuest({
        id: this.guest.id,
        guest: params,
      });

      if (this.errors.length === 0) {
        this.showSnackbar({
          color: "success",
          msg: "Accion realizada con exito!",
        });
        await this.getGuest(this.pathParameter);
      } else {
        this.showSnackbar({
          color: "error",
          msg: "No se puedo realizar la acción",
        });
      }
    },
    question() {
      this.openDialogWarning(true);
    },
    async freeRooms() {
      const id = this.guest.id;
      await this.freeRoom(id);
      this.openDialogWarning(false);
      if (this.guest) {
        //ojo cmprobar un objeto vacio
        this.removeNotification(id);
        this.$router.push({ name: "reception" });
      } else {
        this.showSnackbar({
          color: "error",
          msg: "No se puedo realizar la acción",
        });
      }
    },
  },
  beforeDestroy() {
    EventBus.$off();
  },
};
</script>

<style>
.editable {
  padding: 12px 6px !important;
}
</style>
