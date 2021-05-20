<template>
  <div>
    <loading v-if="loading"/>
    <v-row v-else>
      <v-dialog
        v-model="dialogForm"
        persistent
        max-width="1000px"
      >
        <v-card>
          <v-form
            ref="main"
          >
            <v-card-title class="d-flex justify-space-between px-4">
              <h4 class="text-uppercase font-weight-black">
                Datos del Huesped
              </h4>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  cols="6"
                  sm="4"
                  md="3"
                >
                  <v-text-field
                    v-model="form.category"
                    label="Tipo de habitación"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="6"
                  sm="4"
                  md="3"
                >
                  <v-text-field
                    v-model="form.roomNumber"
                    label="Número de habitacion"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="6"
                  sm="4"
                  md="3"
                >
                  <v-text-field
                    v-model="form.name"
                    label="Nombres"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="6"
                  sm="4"
                  md="3"
                >
                  <v-text-field
                    v-model="form.lastName"
                    label="* Apellidos"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="6"
                  sm="4"
                  md="3"
                >
                  <v-text-field
                    v-model="form.dni"
                    label="Dni"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="6"
                  sm="4"
                  md="3"
                >
                  <v-text-field
                    v-model="form.phone"
                    label="Telefono"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="8"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="4"
                  sm="2"
                  md="2"
                >
                  <v-text-field
                    v-model="form.persons"
                    label="Personas"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    v-model="form.entryDate"
                    label="Fecha de entrada"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    v-model="form.departureDate"
                    label="Fecha de salida"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="6"
                  sm="3"
                  md="3"
                >
                  <v-text-field
                    v-model="form.status"
                    label="Estado"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="6"
                  sm="3"
                  md="3"
                >
                  <v-text-field
                    v-model="form.via"
                    label="Via"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="6"
                >
                  <v-text-field
                    v-model="form.origin"
                    label="Procedencia"
                    outlined
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <v-textarea
                    v-model="form.message"
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
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import moment from 'moment'

  export default {
    components: {
      Loading: () => import("@/components/common/Loading"),
    },
    data () {
      return {
        loading: false,
        form: {
          category: '',
          roomNumber: '',
          name: '',
          lastName: '',
          dni: '',
          phone: '',
          email: '',
          persons: '',
          entryDate: '',
          departureDate: '',
          status: '',
          origin: '',
          via: '',
          message: '',
        }
      }
    },
    computed: {
      ...mapState('guest', ['guest']),
      ...mapState('dialog', ['dialogForm']),
      entryDateFormattedMomentjs () {
        return this.form.entryDate
          ? moment(new Date(this.form.entryDate)).format("LL hh:mm A")
          : moment().format("LL hh:mm A")
      },
    },
    watch: {
      guest () {
        this.loading = true
        this.openDialogForm(true)
        this.form.category = this.guest.room.attributes.category.attributes.name
        this.form.roomNumber = this.guest.room_number
        this.form.name = this.guest.name
        this.form.lastName = this.guest.last_name
        this.form.dni = this.guest.dni
        this.form.phone = this.guest.phone
        this.form.email = this.guest.email
        this.form.persons = this.guest.persons
        this.form.entryDate = moment(new Date(this.guest.entry_date)).format('LL hh:mm A')
        this.form.departureDate = moment(new Date(this.guest.departure_date)).format('LL hh:mm A')
        this.form.status = this.guest.status
        this.form.origin = this.guest.origin
        this.form.via = this.guest.via === 'call' ? 'llamada' : this.guest.via
        this.form.message = this.guest.message
        this.loading = false
      },
    },
    methods: {
      ...mapActions('dialog', ['openDialogForm']),
    },
  }
</script>

<style></style>
