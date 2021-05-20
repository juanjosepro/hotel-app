<template>
  <loading v-if="loading" />
  <v-row v-else>
    <v-col cols="12" md="8" sm="8">
      <v-card class="elevation-20">
        <v-form @submit.prevent="register">
          <v-card-title class="d-flex justify-space-between mb-3">
            <h4 class="text-uppercase font-weight-black">
              Registrar un nuevo Huesped
            </h4>
            <small
              style="font-size: 12px"
              class="text-decoration-underline red--text"
            >
              <b>( * ) Indica campo requerido</b>
            </small>
          </v-card-title>
          <v-card-text>
            <v-row>
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
              <v-col cols="6" md="4" sm="4">
                <v-text-field
                  v-model="form.dni"
                  label="* Dni 0 Pasaporte"
                  placeholder="Dni"
                  outlined
                  dense
                  required
                  autocomplete="off"
                  :error-messages="errors.dni ? errors.dni[0] : ''"
                />
              </v-col>
              <v-col cols="6" md="4" sm="4">
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
              <v-col cols="12" md="8" sm="8">
                <v-text-field
                  v-model="form.origin"
                  label="* Procedencia"
                  placeholder="Lugar de Origin"
                  outlined
                  dense
                  required
                  autocomplete="off"
                  :error-messages="errors.origin ? errors.origin[0] : ''"
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
                  :rules="rules.persons"
                  :error-messages="errors.persons ? errors.persons[0] : ''"
                ></v-slider>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <!-- throw-arrow return 2021-04-09 21:06:00 -->
                <date-and-time
                  :error="errors.departure_date ? errors.departure_date[0] : ''"
                  label="Fecha de Salida"
                  @throw-arrow="form.departureDate = $event"
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
            <v-spacer></v-spacer>
            <div class="d-flex justify-end">
              <btn-router route="reception" text="Volver" />
              <v-btn
                type="submit"
                class="font-weight-black"
                color="green darken-1"
                text
              >
                Hospedar
              </v-btn>
            </div>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="12" md="4" sm="4">
      <tarifa-room :entry-date="form.entryDate" :departure-date="now" />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  components: {
    Loading: () => import("@/components/common/Loading"),
    BtnRouter: () => import("@/components/ui/BtnRouter"),
    TarifaRoom: () => import("@/components/common/TarifaRoom"),
    DateAndTime: () => import("@/components/ui/DateAndTime"),
  },
  data() {
    return {
      loading: true,
      form: {
        name: "",
        lastName: "",
        dni: "",
        phone: "",
        persons: 1,
        origin: "",
        message: "",
        entryDate: "",
        departureDate: "",
      },
      rules: {
        persons: [(val) => val < 10 || `Maximo 10 personas :'(`],
      },
    };
  },
  computed: {
    ...mapState("reception", ["errors"]),
    ...mapState("rooms", ["room"]),
    now() {
      return this.form.departureDate;
    },
  },
  async created() {
    this.cleanErrors();
    if (this.$route.params.number) {
      await this.getRoomByNumber(this.$route.params.number);
      //if the room does not exist with the NUMBER entered by keyboard in the url
      if (!this.room.number) {
        return this.$router.go(-1)
      }
    }else {
      location.href = "/";
    }
    this.form.entryDate = moment().format("YYYY-MM-DD HH:mm:ss");
    this.loading = false;
  },
  methods: {
    ...mapActions("rooms", ["getRoomByNumber"]),
    ...mapActions("reception", ["registeNewGuest", "cleanErrors"]),
    ...mapActions("snackbar", ["showSnackbar"]),

    async register() {
      this.cleanErrors();

      const params = {
        room_number: this.room.number,
        name: this.form.name,
        last_name: this.form.lastName,
        dni: this.form.dni,
        phone: this.form.phone,
        persons: parseInt(this.form.persons),
        origin: this.form.origin,
        message: this.form.message,
        entry_date: this.form.entryDate,
        departure_date: this.form.departureDate,
      };

      await this.registeNewGuest(params);

      if (this.errors.length === 0) {
        this.showSnackbar({
          color: "success",
          msg: "Accion realizada con exito!",
        });

        this.$router.push({
          name: "reception.more-information-about-the-guest",
          params: { number: this.room.number },
        });
      } else {
        this.showSnackbar({
          color: "error",
          msg: "No se pudo realizar la acción!",
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
