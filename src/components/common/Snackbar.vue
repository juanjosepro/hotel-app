<template>
  <v-snackbar
    class="text-uppercase"
    :value="show"
    :color="color"
    timeout="2000"
    :absolute="false"
    top
    right
  >
    {{ msg }}
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";

  export default {
    computed: {
      ...mapState("snackbar", ["show", "color", "msg"]),
    },
  }
</script>

<style>

</style>
