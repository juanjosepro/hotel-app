<template>
  <v-menu
    v-model="datepicker"
    :close-on-content-click="false"
    max-width="290"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="computedDateFormattedMomentjs"
        :label="label"
        readonly
        outlined
        dense
        :error-messages="error"
        v-on="on"
        @click:clear="dateValue = null"
      />
    </template>
    <v-date-picker
      v-model="dateValue"
      locale="es"
      :min="currentDate"
      @change="datepicker = false"
    />
  </v-menu>
</template>

<script>
  import moment from 'moment'
  moment.locale('es')

  export default {
    props: {
      date: {
        default: moment().format('YYYY-MM-DD hh:mm A'),
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
    data () {
      return {
        dateValue: this.date,
        currentDate: moment().format('YYYY-MM-DD hh:mm A'),
        datepicker: false,
      }
    },
    computed: {
      computedDateFormattedMomentjs () {
        this.$emit('throw-arrow', this.dateValue)
        return this.dateValue ? moment(this.dateValue).format('LL') : ''
      },
    },
  }
</script>

<style>

</style>
