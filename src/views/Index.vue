<template>
  <v-app>
    <loader v-if="loading" />

    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <dashboard-core-settings />

    <snackbar />
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DashboardIndex",
  components: {
    DashboardCoreAppBar: () => import("@/components/layout/AppBar"),
    DashboardCoreDrawer: () => import("@/components/layout/Drawer"),
    DashboardCoreSettings: () => import("@/components/layout/Settings"),
    DashboardCoreView: () => import("@/components/layout/View"),
    Snackbar: () => import("@/components/common/Snackbar"),
    Loader: () => import("@/components/common/Loader"),
  },
  data: () => ({
    expandOnHover: false,
  }),
  computed: {
    ...mapState("loader", ["loading"]),
  },
};
</script>
<style>
a {
  text-decoration: none;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.8 s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>