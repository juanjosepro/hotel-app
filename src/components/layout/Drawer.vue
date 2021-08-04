<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
    class="navigation-drawer"
  >
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
    </template>

    <v-list dense nav>
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center text-uppercase"
          style="font-size: 18px"
          v-text="profile.avatar"
        >
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="text-uppercase"
            style="font-size: 18px"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mb-2" />

      <template v-for="(item, i) in user">
        <base-item-group v-if="item.children" :key="`group-${i}`" :item="item">
        </base-item-group>
      </template>
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group v-if="item.children" :key="`group-${i}`" :item="item">
        </base-item-group>

        <base-item v-else :key="`item-${i}`" :item="item" />
      </template>

      <div />
    </v-list>

    <template v-slot:append>
      <div @click="signOff()">
        <base-item
          :item="{
            title: $t('logout'),
            icon: 'mdi-exit-to-app',
          }"
        />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState, mapActions } from "vuex";

export default {
  name: "DashboardCoreDrawer",

  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    user: [],
    itemsAdmin: [
      /*       {
        icon: "mdi-view-dashboard",
        title: "Items",
        children: [
          {
            title: "Item2",
            to: "/",
          },
          {
            title: "Item2",
            to: "/",
          },
        ],
      }, */
      {
        icon: "mdi-view-dashboard",
        title: "dashboard",
        to: "/",
      },
      {
        title: "roles",
        icon: "mdi-clipboard-outline",
        to: "/roles",
      },
      {
        title: "users",
        icon: "mdi-account-group",
        to: "/usuarios",
      },
      {
        title: "categories",
        icon: "mdi-warehouse",
        to: "/categorias",
      },
      {
        title: "rooms",
        icon: "mdi-shield-home",
        to: "/habitaciones",
      },
      {
        title: "reception",
        icon: "mdi-bed",
        to: "/recepcion",
      },
      {
        title: "reservation",
        icon: "mdi-card-account-phone",
        to: "/reservas",
      },
      {
        title: "guest",
        icon: "mdi-account-details",
        to: "/clientes",
      },
      {
        title: "box",
        icon: "mdi-account-cash",
        to: "/caja",
      },
      {
        title: "setting",
        icon: "mdi-cog-refresh",
        to: "/configuracion-del-hotel",
      },
    ],
    itemsRecep: [
      {
        title: "rooms",
        icon: "mdi-shield-home",
        to: "/habitaciones",
      },
      {
        title: "reception",
        icon: "mdi-bed",
        to: "/recepcion",
      },
      {
        title: "reservation",
        icon: "mdi-card-account-phone",
        to: "/reservas",
      },
      {
        title: "guest",
        icon: "mdi-account-details",
        to: "/clientes",
      },
    ],
  }),

  computed: {
    ...mapState(["barColor", "barImage"]),
    ...mapState("hotel", ["hotel"]),
    ...mapState("login", ["userAuth"]),
    
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
    computedItems() {
      if (this.userAuth.role.id === "1") {
        /* console.log(this.userAuth) */
        return this.itemsAdmin.map(this.mapItem);
      }
      return this.itemsRecep.map(this.mapItem);
    },
    profile() {
      if (!this.hotel || !this.hotel.name) return ''

      let text = ''
      this.hotel.name.split(' ').forEach(val => {
        text += val.substring(0, 1)
      })

      return {
        avatar: text,
        title: this.hotel.name,
      };
    },
  },
  async created() {
    await this.getHotel();
    this.authUser();
  },
  methods: {
    ...mapActions("login", ["logout"]),
    ...mapActions("hotel", ["getHotel"]),

    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title),
      };
    },
    async signOff() {
      await this.logout()
      location.href = '/login'
    },
    authUser() {
      this.user.push({
        avatar: this.userAuth.image.url,
        title: this.userAuth.name,
        group: 'usuarios',
        children: [
          {
            title: "Mi Perfil",
            to: 'editar/' + this.userAuth.dni,
          },
        ],
      });
    },
  },
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
