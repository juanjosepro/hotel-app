<template>
  <v-row>
    <v-dialog v-model="dialogForm" persistent max-width="500px" style="">
      <v-card>
        <v-form ref="main" @submit.prevent="createCategory">
          <v-card-title class="d-flex justify-space-between px-4">
            <h4 class="text-uppercase font-weight-black">Registrar nueva categoria</h4>
            <small class="red--text font-weight-black" style="font-size: 12px">
              (*) Indica campo requerido
            </small>
          </v-card-title>
          <v-card-text>
            <br />
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  autocomplete="off"
                  v-model="name"
                  label="* Nombre de la categoria"
                  outlined
                  dense
                  autofocus
                  required
                  :error-messages="errors.name ? errors.name[0] : ''"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="py-0">
            <v-spacer />
            <v-btn
              class="font-weight-black"
              color="error"
              text
              @click="openDialogForm(false)"
            >
              Cerrar
            </v-btn>
            <v-btn type="submit" class="font-weight-black" text color="success">
              Registrar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    name: "",
  }),
  computed: {
    ...mapState("dialog", ["dialogForm"]),
    ...mapState("categories", ["errors"]),
  },
  methods: {
    ...mapActions("dialog", ["openDialogForm"]),

    async createCategory() {
      this.$emit("create", { name: this.name });
    },
  },
};
</script>

<style>
.v-card__text {
  padding-bottom: 0;
}
</style>
