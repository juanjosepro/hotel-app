<template>
  <loading v-if="loading"/>
  <v-row v-else>
    <v-dialog v-model="dialogForm" persistent max-width="500px">
      <v-card>
        <v-form ref="main" @submit.prevent="createOrUpdate">
          <v-card-title class="d-flex justify-space-between px-4">
            <h4
              class="font-weight-black text-uppercase"
              v-text="edit ? 'Actualizar el Rol' : 'Registrar nuevo Rol'"
            />
            <small class="red--text font-weight-black" style="font-size: 12px">
              (*) Indica campo requerido
            </small>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="form.name"
                  label="* Nombre del rol"
                  outlined
                  dense
                  required
                  :error-messages="errors.name ? errors.name[0] : ''"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  v-model="form.description"
                  rows="3"
                  label="* Descripción"
                  outlined
                  name="input-7-4"
                  required
                  :error-messages="errors.description ? errors.description[0] : ''"
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
            <v-btn
              type="submit"
              class="font-weight-black"
              text
              :color="edit ? 'warning' : 'success'"
            >
              {{ edit ? "Actualizar" : "Registrar" }}
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
  components: {
    Loading: () => import("@/components/common/Loading"),
  },
  data() {
    return {
      loading: false,
      edit: false,
      form: {
        id: "",
        name: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapState("roles", ["role", "errors"]),
    ...mapState("dialog", ["dialogForm", "dialogWarning"]),
  },
  watch: {
    role() {
      this.loading = true
      this.edit = true;
      this.form.id = this.role.id;
      this.form.name = this.role.name;
      this.form.description = this.role.description;
      this.loading = false
    },
    dialogForm(){
      if (!this.dialogForm) {
        this.edit = false;
        this.form.id = ""
        this.form.name = ""
        this.form.description = ""
      }
    }
  },
  methods: {
    ...mapActions("dialog", ["openDialogForm"]),

    createOrUpdate() {
      const data = {
        name: this.form.name,
        description: this.form.description,
      };

      if (this.edit) {
        this.$emit("update", {
          id: this.form.id,
          role: data,
        });
      } else {
        this.$emit("create", data);
      }
    },
  },
};
</script>
