<template>
<div>
  <v-main style="display: flex; flex-wrap: wrap">
    <router-view style="min-height: calc(100vh - 160px)" />

    <dashboard-core-footer style="align-self: flex-end" />
  </v-main>
</div>
</template>

<script>
export default {
  name: "DashboardCoreView",

  components: {
    DashboardCoreFooter: () => import("./Footer"),
  },
};
</script>
