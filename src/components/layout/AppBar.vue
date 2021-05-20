<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.path"
    />

    <v-spacer />

    <v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      style="max-width: 250px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <audio autoplay v-if="notificationsLength">
      <source src="@/assets/notification-sound.mp3" type="audio/mp3">
    </audio>

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-badge
            v-if="notificationsLength"
            color="red"
            overlap
            bordered
          >
            <template v-slot:badge>
              <span>{{notificationsLength}}</span>
            </template>
            <v-icon>mdi-bell</v-icon>
          </v-badge>

          <v-icon v-else>mdi-bell</v-icon>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        nav
      >
        <div>
          <app-bar-item
            v-for="(n, i) in notifications"
            :key="`item-${i}`"
          >
            <v-list-item-title style="padding:0">
              <a
                style="text-decoration:none;"
                class="grey--text"
                :href="`/recepcion/más-información-sobre-el-huesped/${n.room_number}`">
                  Tiempo cumplido de la habitación {{n.room_number}}  Ver...
              </a>
            </v-list-item-title>
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>
    <v-menu
      bottom
      right
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        nav
      >
        <div>
          <app-bar-item>
            <v-list-item-title @click="myProfile()">Mi perfil</v-list-item-title>
          </app-bar-item>
          <app-bar-item>
            <v-list-item-title>Configuración</v-list-item-title>
          </app-bar-item>
          <app-bar-item>
            <v-list-item-title @click="signOff()">Cerrar Sesión</v-list-item-title>
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapActions, mapMutations } from 'vuex'
  import moment from "moment";

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      ...mapState(['drawer']),
      ...mapState("notification", ['notifications']),
      ...mapState("guest", ["guestHosped"]),

      notificationsLength(){
        return this.notifications.length
      }
    },
    async created(){
      await this.checkTimeLimit();

      setInterval(() => {
        this.checkTimeLimit();
      }, 60000);

    },
    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      ...mapActions("login",["logout"]),
      ...mapActions("guest", ["getAllGuests"]),
      ...mapActions("notification", ["createNotification"]),
      async myProfile(){
        const { dni } = await this.$store.state.login.userAuth;
        this.$router.push({name: "users.edit", params:{dni: dni}})
      },
      async signOff() {
        await this.logout()
        return this.$router.push({name: "login"});
      },
      async checkTimeLimit(){
        await this.getAllGuests("hosped");

        const data = [];

        if (this.guestHosped.length > 0) {
          const now = moment().format('YYYY-MM-DD HH:mm');

          this.guestHosped.map(guest => {
            const checkTime = moment(new Date(now)).isAfter(guest.departure_date)

            if (checkTime) {
              data.push(guest)
            }
          })

          this.createNotification(data)
        } else {
          this.createNotification(data)
        }
      }
    },
  }
</script>

<style scoped>
.v-menu__content .v-list--nav .v-list-item {
  padding: 0px 20px;
}
.v-menu__content .v-list--nav .v-list-item:hover .v-list-item__title a{
  color: white!important;
}
</style>