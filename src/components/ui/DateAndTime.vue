<template>
  <div>
    <v-dialog
      ref="dialog"
      v-model="dialog"
      :close-on-content-click="false"
      :return-value.sync="model"
      transition="scale-transition"
      persistent
      max-width="700px"
      min-width="700px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="showTextDate"
          :label="label"
          prepend-icon="mdi-alarm"
          readonly
          outlined
          dense
          :error-messages="error"
          v-bind="attrs"
          v-on="on"
        />
      </template>

      <div class="v-date-time-widget-container">
        <v-row>
          <v-col cols="12" sm="6">
            <v-date-picker
              v-model="dateModel"
              full-width
              color="primary"
              locale="es"
              :min="currentDate"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-switch
              v-model="showTimePicker"
              class="ma-2"
              label="¿Desea agregar mas tiempo (horas - minutos) a la fecha de salida?"
            />
            <div v-if="showTimePicker">
              <v-time-picker
                v-model="timeModel"
                color="primary"
                full-width
                scrollable
              />

              <v-btn
                small
                fab
                :color="getMeridiamButtonColor('AM')"
                class="btn-am"
                @click="meridiam = 'AM'"
              >
                AM
              </v-btn>

              <v-btn
                fab
                small
                :color="getMeridiamButtonColor('PM')"
                class="btn-pm"
                @click="meridiam = 'PM'"
              >
                PM
              </v-btn>
            </div>
          </v-col>

          <v-col lg="12" class="text-center">
            <v-btn text small class="font-weight-black" @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn
              text
              small
              color="success"
              class="font-weight-black"
              @click="confirm()"
            >
              Aceptar
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("es");

export default {
  props: {
    date: {
      type: String,
    },
    label: {
      default: () => {},
      type: String,
    },
    error: {
      default: () => {},
      type: String,
    },
  },
  data() {
    return {
      dialog: false,
      showTimePicker: false,
      currentDate: moment().format("YYYY-MM-DD"),
      dateModel: "",
      showTextDate: "",
      meridiam: "",
      timeModel: "",
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(model) {},
    },
    computedDateFormattedMomentjs() {
      // 30 de agosto de 2020
      return this.dateModel ? moment(this.dateModel).format("LL") : "";
    },
  },
  created() {
    let now = ""
    if (this.date) {
      now = this.date
    } else {
      //if empty, the current date is assigned + 1 day
      now = moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss");
    }
    this.dateModel = now.substr(0, 10)

    let date = "";
    //2021-04-10 13:58:00 to 2021-04-10 01:58 PM
    date = moment(now).format("YYYY-MM-DD hh:mm A");
    this.timeModel = date.substr(11, 5); //Hour 09:06
    this.meridiam = date.substr(-2); //PM or AM

    this.onUpdateDate();
  },
  methods: {
    // Confirm the datetime selection and close the popover
    confirm() {
      this.onUpdateDate();
      this.dialog = false;
    },
    // Format the date and trigger the input event
    onUpdateDate() {
      if (!this.dateModel || !this.timeModel) return false;
      // ejem 09:06 AM
      const selectedTime = this.timeModel + " " + this.meridiam;

      if (this.timeModel.substr(0, 2) === "00") {
        // reemplaza  00:57 por 12:57
        const time = "12" + this.timeModel.substr(2, 3);
        // 30 de agosto de 2020 12:57:10 AM
        this.showTextDate =
          this.computedDateFormattedMomentjs +
          ", " +
          time +
          " " +
          this.meridiam;
      } else {
        this.showTextDate =
          this.computedDateFormattedMomentjs + ", " + selectedTime;
      }

      //2021-04-09 09:06 PM
      const date = moment(new Date(this.dateModel + " " + selectedTime)).format(
        "YYYY-MM-DD HH:mm"
      );
      //2021-04-09 21:06:00
      this.$emit("throw-arrow", date + ":00");
    },
    // Set the active state for the meridiam buttons
    getMeridiamButtonColor(m) {
      if (m === this.meridiam) {
        return "primary";
      } else {
        return "darkgray";
      }
    },
  },
};
</script>

<style lang="scss">
.v-picker {
  & .v-time-picker-title__ampm {
    display: none;
  }
  & .v-time-picker-clock__ampm {
    display: none;
  }
}
.v-date-time-widget-container {
  background: white;
  padding: 15px;
}
.v-card {
  box-shadow: none;
}
.btn-am {
  float: left;
}
.btn-pm {
  float: right;
}
.v-date-picker-table {
  height: auto;
}
</style>
