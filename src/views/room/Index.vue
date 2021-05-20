<template>
  <v-container
    id="rooms"
    fluid
    tag="section"
  >
    <page-content />
  </v-container>
</template>

<script>
  import PageContent from './List'

  export default {
    components: {
      PageContent,
    },
  }
</script>

<style>
</style>
