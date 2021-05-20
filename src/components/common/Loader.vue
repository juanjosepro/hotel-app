<template>
  <v-dialog v-model="loader" hide-overlay persistent width="300">
    <v-card>
      <v-card-text style="width:100%">
        <b>Cargando...</b>
        <v-progress-linear
          indeterminate
          rounded
          color="deep-purple accent-4"
          height="6"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({ loader: true }),
};
</script>

<style>
</style>
