<template>
  <v-container id="roles" fluid tag="section">
    <page-content />
  </v-container>
</template>

<script>
export default {
  components: {
    PageContent: () => import('./List'),
  }
};
</script>