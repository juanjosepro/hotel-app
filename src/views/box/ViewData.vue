<template>
  <v-row>
    <v-dialog v-model="dialogForm" persistent max-width="1000px">
      <v-card>
        <v-card-title class="d-flex justify-space-between px-5">
          <h4 class="text-uppercase font-weight-black">Datos del Huesped</h4>
          <v-btn
            class="font-weight-black"
            color="error"
            text
            @click="openDialogForm(false)"
          >
            Cerrar
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <div style="width: 100%; padding-left: 12px">
              Datos de la Habitación
            </div>
            <v-col cols="6" sm="3" md="3">
              <v-text-field
                v-model="guest.categoryName"
                label="Tipo de habitación"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="6" sm="3" md="3">
              <v-text-field
                v-model="guest.categoryPrice"
                label="Precio"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="6" sm="3" md="3">
              <v-text-field
                v-model="guest.roomNumber"
                label="Número"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="6" sm="3" md="3">
              <v-text-field
                v-model="guest.roomLevel"
                label="Nivel"
                outlined
                dense
                disabled
              />
            </v-col>
            <div style="width: 100%; padding-left: 12px">Datos del Huesped</div>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                v-model="guest.entryDate"
                label="Fecha de entrada"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                v-model="guest.departureDate"
                label="Fecha de salida"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="6" sm="2" md="2">
              <v-text-field
                v-model="guest.days"
                label="Total dias de estadia"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="6" sm="2" md="2">
              <v-text-field
                v-model="guest.total"
                label="Total"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="6" sm="4" md="3">
              <v-text-field
                v-model="guest.name"
                label="Nombres"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="6" sm="4" md="3">
              <v-text-field
                v-model="guest.lastName"
                label="* Apellidos"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="6" sm="4" md="3">
              <v-text-field
                v-model="guest.dni"
                label="Dni"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="6" sm="4" md="3">
              <v-text-field
                v-model="guest.phone"
                label="Telefono"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="8" sm="8" md="4">
              <v-text-field
                v-model="guest.email"
                label="Email"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="4" sm="4" md="2">
              <v-text-field
                v-model="guest.persons"
                label="Personas"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="6" sm="4" md="3">
              <v-text-field
                v-model="guest.status"
                label="Estados"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="6" sm="4" md="3">
              <v-text-field
                v-model="guest.via"
                label="Via"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="guest.origin"
                label="Procedencia"
                outlined
                dense
                disabled
              />
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-textarea
                v-model="guest.message"
                rows="3"
                label="Mensage"
                outlined
                name="input-7-4"
                disabled
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="py-0">
          <v-spacer />
          <v-btn
            class="font-weight-black"
            color="error"
            text
            @click="openDialogForm(false)"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  props: {
    details: {
      required: true,
    },
  },
  data() {
    return {
      guest: {
        categoryName: "",
        categoryPrice: "",
        roomNumber: "",
        roomLevel: "",
        entryDate: "",
        departureDate: "",
        createdAt: "",
        days: "",
        total: "",
        name: "",
        lastName: "",
        dni: "",
        phone: "",
        email: "",
        persons: "",
        status: "",
        via: "",
        origin: "",
        message: "",
      }
    };
  },
  computed: {
    ...mapState("dialog", ["dialogForm"]),
  },
  watch: {
    details() {
      this.guest.categoryName = this.details.guest.room.category.name
      this.guest.categoryPrice = this.details.guest.room.category.price
      this.guest.roomNumber = this.details.guest.room.number
      this.guest.roomLevel = this.details.guest.room.level
      this.guest.entryDate = this.formaterDate(this.details.guest.entry_date);
      this.guest.departureDate = this.formaterDate(this.details.guest.departure_date);
      this.guest.createdAt = this.formaterDate(this.details.created_at);
      this.guest.days = this.details.days
      this.guest.total = this.details.amount
      this.guest.name = this.details.guest.name
      this.guest.lastName = this.details.guest.last_name
      this.guest.dni = this.details.guest.dni
      this.guest.phone = this.details.guest.phone
      this.guest.email = this.details.guest.email
      this.guest.persons = this.details.guest.persons
      this.guest.status = this.details.guest.status === "hosped" ? "hospedado": "retirado"
      this.guest.via = this.details.guest.via
      this.guest.origin = this.details.guest.origin
      this.guest.message = this.details.guest.message
    },
  },
  methods: {
    ...mapActions("dialog", ["openDialogForm"]),

    formaterDate(date) {
      return moment(new Date(date)).format("LL hh:mm A");
    },
  },
};
</script>

<style></style>
