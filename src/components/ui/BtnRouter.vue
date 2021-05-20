<template>
  <router-link
    style="text-decoration: none"
    :to="{name: r}"
  >
    <v-btn
      text
      class="font-weight-black"
    >
      {{ text }}
    </v-btn>
  </router-link>
</template>

<script>
  export default {
    props: {
      route: {
        required: true,
        type: String,
      },
      color: {
        default: 'black--text',
        type: String,
      },
      text: {
        required: true,
        type: String,
      },
    },
    data () {
      return {
        r: this.route,
      }
    },
  }
</script>

<style>
</style>
