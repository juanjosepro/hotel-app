<template>
  <v-main>
    <router-view style="min-height: calc(100vh - 160px)" />

    <dashboard-core-footer style="align-self: flex-end" />
  </v-main>
</template>

<script>
export default {
  name: "DashboardCoreView",

  components: {
    DashboardCoreFooter: () => import("./Footer"),
  },
};
</script>
