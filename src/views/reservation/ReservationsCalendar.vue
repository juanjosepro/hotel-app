<template>
  <loading v-if="loading"/>
  <v-row v-else class="fill-height">
    <v-col cols="12" class="py-0">
      <router-link :to="{ name: 'reservation.create' }" class="mr-4">
        <button
          class="badge badge-pill badge-success shadow-success m-1 my-button"
        >
          Registrar nueva Reserva
        </button>
      </router-link>
      <router-link :to="{ name: 'reservation.table' }" class="mr-4">
        <button
          class="badge badge-pill badge-primary shadow-primary m-1 my-button"
        >
          Ver reservas en modo Tabla
        </button>
      </router-link>
    </v-col>
    <v-col cols="12" class="py-2">
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            HOY
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Dia</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mes</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 dias</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
        dark
          ref="calendar"
          v-model="focus"
          color="primary"
          locale="es"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          :short-weekdays="false"
          :weekdays="weekdays"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <router-link 
                :to="{
                  name: 'reservation.update',
                  params: {id: selectedEvent.id}
                }"
                class="ma-2">
                <v-icon color="white">mdi-pencil</v-icon>
              </router-link>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name +' '+ selectedEvent.last_name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <div class="d-flex justify-space-between">
                  <small>Reserva echa el dia:</small>
                  <small v-html="selectedEvent.created_at"></small>
              </div>
              <div class="d-flex justify-space-between">
                  <small>Tipo de Habitación:</small>
                  <small v-html="selectedEvent.category"></small>
              </div>
              <div class="d-flex justify-space-between">
                  <small>Reserva echa mediante:</small>
                  <small v-html="selectedEvent.via"></small>
              </div>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-between">
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cerrar
              </v-btn>
              <router-link 
                :to="{
                  name: 'reservation.update',
                  params: {id: selectedEvent.id}
                }"
                class="ma-2">
                <v-btn
                  text
                  color="secondary"
                >
                  Ver Mas...
                </v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from "moment";

  export default {
    components: {
      Loading: () => import("@/components/common/Loading"),
    },
    data: () => ({
      loading: true,
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      weekdays: [1, 2, 3, 4, 5, 6, 0]
    }),
    computed: {
      ...mapState('reservation', ['reservations']),
    },
    mounted () {
      if (!this.loading) {
        this.$refs.calendar.checkChange()
      }
    },
    async created(){
      await this.getAllReservation()
      this.setEvents()
      this.loading = false
    },
    methods: {
      ...mapActions('reservation', ['getAllReservation']),
      setEvents() {
        const events = []

        this.reservations.map((item, i) => {
          events.push({
            id: item.id,
            name: item.name,
            last_name: item.last_name,
            category: item.category.name,
            via: item.via,
            created_at: moment(item.created_at).format('LL hh:mm A'),
            start: item.entry_date,
            end: item.departure_date,
            color: this.colors[i]
          })
        })

        this.events = events
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange () {
        this.setEvents()
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>