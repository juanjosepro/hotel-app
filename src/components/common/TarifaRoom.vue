<template>
  <v-card v-if="!loading" class="mx-auto elevation-20" max-width="374">
    <v-img max-height="200" :src="data.categoryImage" />

    <v-card-title
      class="d-flex justify-space-between title text-uppercase font-weight-black"
    >
      <div>
        Habitación:
        <v-chip class="ma-2" label small>
          {{ data.nameCategory }}
        </v-chip>
      </div>
      <v-rating
        :value="4.5"
        color="amber"
        dense
        half-increments
        readonly
        size="14"
      />
    </v-card-title>

    <v-card-text class="title text-uppercase">
      <v-row
        align="center"
        class="mx-0 d-flex justify-space-between font-weight-black"
      >
        Ubicación
        <v-chip class="ma-2" label small>
          {{ data.roomLocation }}
        </v-chip>
      </v-row>
      <v-row
        align="center"
        class="mx-0 d-flex justify-space-between font-weight-black"
      >
        Precio
        <v-chip class="ma-2" label small>
          {{ data.categoryPrice }}
        </v-chip>
      </v-row>
      <v-row
        align="center"
        class="mx-0 d-flex justify-space-between font-weight-black"
      >
        <div>
          Número
          <v-chip class="ma-2" label small>
            {{ data.roomNumber }}
          </v-chip>
        </div>
        <div>
          Nivel
          <v-chip class="ma-2" label small>
            {{ data.roomLevel }}
          </v-chip>
        </div>
      </v-row>
      <v-row>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header
              class="title text-uppercase font-weight-black"
            >
              Detalles de la Habitación
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-chip class="ma-2" label small>
                {{ data.categoryDetails }}
              </v-chip>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
      <div>
        <table width="100%">
          <thead>
            <tr>
              <th colspan="2" class="text-center">
                <h1>TARIFA</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fecha de ENTRADA</td>
              <td class="float-right">
                {{ entryDateFormattedMomentjs }}
              </td>
            </tr>
            <tr>
              <td>Fecha de SALIDA</td>
              <td class="float-right">
                {{ departureDateFormattedMomentjs }}
              </td>
            </tr>
            <tr>
              <td>Tiempo total</td>
              <td class="float-right">
                {{ timeLeft }}
              </td>
            </tr>
            <tr v-if="realTimeDate">
              <td>Tiempo Restante</td>
              <td class="float-right">
                {{ timeRemaining }}
              </td>
            </tr>
            <tr>
              <td>Total</td>
              <td class="float-right">
                <v-chip color="pink" label text-color="white">
                  <v-icon left> mdi-label </v-icon>
                  {{ total }}
                </v-chip>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  props: {
    entryDate: {
      required: true,
      type: String,
    },
    departureDate: {
      required: true,
      type: String,
    },
    realTimeDate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: true,
      computerFormat: "YYYY-MM-DD HH:mm",
      humanFormat: "LL hh:mm A",
      departure: "",
      entry: "",
      nameCategory: "...",
      categoryPrice: "0",
      categoryDetails: "...",
      categoryImage: "",
      roomNumber: "0",
      roomLevel: "0",
      roomLocation: "...",
      timeRemaining: "...",
    };
  },
  computed: {
    ...mapState("rooms", ["room"]),

    entryDateFormattedMomentjs() {
      //crea una nueva instancia para poder acceder a los dias, horas y minutos.
      this.entry = moment(this.entryDate, this.computerFormat);
      return moment(new Date(this.entryDate)).format(this.humanFormat);
    },
    departureDateFormattedMomentjs() {
      this.departure = moment(this.departureDate, this.computerFormat);
      return moment(new Date(this.departure)).format(this.humanFormat);
    },
    timeLeft() {
      const days = this.departure.diff(this.entry, "days");
      const hours = moment.duration(this.departure.diff(this.entry)).hours();
      const minutes = moment
        .duration(this.departure.diff(this.entry))
        .minutes();
      return `${days} dia con ${hours} horas y ${minutes} minutos`;
    },
    total() {
      const days = moment.duration(this.departure.diff(this.entry)).days();
      const amount = days * parseFloat(this.data.categoryPrice.split(',').join(''));
      return new Intl.NumberFormat("es-PE", { style: 'currency', currency: 'PEN' }).format(amount);
    },
    data(){
      if (this.room.hasOwnProperty("category")) {
        return {
          nameCategory: this.room.category.attributes.name,
          categoryPrice: this.room.category.attributes.price,
          categoryDetails: this.room.category.attributes.details,
          categoryImage: this.room.category.attributes.images[0].url,
          roomNumber: this.room.number,
          roomLevel: this.room.level,
          roomLocation: this.room.location,
        }
      }else {
        return {
          nameCategory: this.nameCategory,
          categoryPrice: this.categoryPrice,
          categoryDetails: this.categoryDetails,
          categoryImage: this.categoryImage,
          roomNumber: this.roomNumber,
          roomLevel: this.roomLevel,
          roomLocation: this.roomLocation,
        }
      }
    }
  },
  async created() {if (this.realTimeDate) {
      setTimeout(() => {
        this.calculateRemainingTime();
        setInterval(() => {
          this.calculateRemainingTime();
        }, 60000);
      }, 1000);
    }

    this.loading = false;
  },
  methods: {
    calculateRemainingTime() {
      const now = moment().format("YYYY-MM-DD HH:mm:ss");
      this.departure = moment(this.departureDate, this.computerFormat);
      const days = this.departure.diff(now, "days");
      const hours = moment.duration(this.departure.diff(now)).hours();
      const minutes = moment.duration(this.departure.diff(now)).minutes();
      this.timeRemaining = `${days} dia con ${hours} horas y ${minutes} minutos`;
    },
  },
};
</script>

<style>
.v-expansion-panel-header {
  padding: 10px 10px !important;
}
</style>
