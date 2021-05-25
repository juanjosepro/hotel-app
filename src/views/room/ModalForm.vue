<template>
  <loading v-if="loading"/>
  <v-row v-else>
    <v-dialog v-model="dialogForm" persistent max-width="500px">
      <v-card>
        <v-form ref="main" @submit.prevent="createOrUpdate">
          <v-card-title class="d-flex justify-space-between px-4">
            <h4
              class="text-uppercase font-weight-black"
              v-text="edit ? 'Actualizar habitación' : 'Registrar habitación'"
            />
            <small class="red--text font-weight-black" style="font-size: 12px">
              (*) Indica campo requerido
            </small>
          </v-card-title>
          <v-card-text>
            <br />
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="form.categoryId"
                  :items="categories"
                  item-text="name"
                  item-value="id"
                  :label="edit ? 'Categoria' : '* Categorias'"
                  placeholder="Seleccione la categoria"
                  dense
                  outlined
                  :error-messages="errors.category_id ? errors.category_id[0] : ''"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.number"
                  label="* Número"
                  placeholder="Número"
                  dense=""
                  outlined
                  required
                  autocomplete="off"
                  :error-messages="errors.number ? errors.number[0] : ''"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.location"
                  label="Ubicación"
                  placeholder="Ubicación"
                  dense=""
                  outlined
                  required
                  autocomplete="off"
                  :error-messages="errors.location ? errors.location[0] : ''"
                />
              </v-col>
              <v-col :cols="edit ? '6' : '12'">
                <v-select
                  v-model="form.level"
                  :items="levels"
                  item-text="level"
                  item-value="level"
                  :label="edit ? 'Nivel' : '* Niveles'"
                  placeholder="Seleccione el nivel"
                  dense
                  outlined
                  :error-messages="errors.level ? errors.level[0] : ''"
                />
              </v-col>
              <v-col v-if="edit" cols="6">
                <v-select
                  v-model="form.status"
                  :items="transStatus"
                  item-text="text"
                  item-value="value"
                  :label="edit ? 'Estado' : '* Estados'"
                  placeholder="Seleccione el estado"
                  dense
                  outlined
                  :error-messages="errors.status ? errors.status[0] : ''"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="py-0">
            <v-spacer />
            <v-btn
              color="red darken-1"
              text
              class="font-weight-black"
              @click="openDialogForm(false)"
            >
              Cerrar
            </v-btn>
            <v-btn
              type="submit"
              :color="edit ? 'warning' : 'success'"
              text
              class="font-weight-black"
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
      levels: 0,
      edit: false,
      form: {
        id: "",
        categoryId: "",
        number: "",
        level: "",
        location: "",
        status: "",
      },
    };
  },
  computed: {
    ...mapState("categories", ["categories"]),
    ...mapState("hotel", ["hotel"]),
    ...mapState("rooms", ["room", "errors"]),
    ...mapState("dialog", ["dialogForm", "dialogWarning"]),

    transStatus() {
      return [
        { text: this.$t("available"), value: "available" },
        { text: this.$t("occupied"), value: "occupied" },
        { text: this.$t("maintenance"), value: "maintenance" },
        { text: this.$t("cleaning"), value: "cleaning" },
        { text: this.$t("disabled"), value: "disabled" },
      ];
    },
  },
  watch: {
    room() {
      if (!this.dialogWarning) {
        this.loading = true
        this.edit = true;
        this.form.id = this.room.id;
        this.form.categoryId = this.room.category.attributes.id;
        this.form.number = this.room.number;
        this.form.level = this.room.level;
        this.form.location = this.room.location;
        this.form.status = this.room.status;
        this.loading = false
    }
    },
    dialogForm() {
      if (!this.dialogForm) {
        this.edit = false;
        this.form.number = "";
        this.form.categoryId = "";
        this.form.level = "";
        this.form.location = "";
        this.form.status = "";
      }
    },
  },
  async created() {
    await this.getAllCategories();
    await this.getHotel();
    await this.levelsHotel();
    if (!this.hotel) {
      confirm("Primero debe actualizar los datos del Hotel.");
      window.location.href =
        process.env.VUE_APP_URL + "configuracion-del-hotel";
    }
    if (this.categories.length === 0) {
      alert("Primero debe crear una categoria.")
    }
  },
  methods: {
    ...mapActions("categories", ["getAllCategories"]),
    ...mapActions("hotel", ["getHotel"]),
    ...mapActions("dialog", ["openDialogForm"]),

    levelsHotel() {
      const levels = [];
      const until = parseInt(this.hotel.levels);
      for (let i = 1; i <= until; i++) {
        levels.push({ level: i });
      }
      this.levels = levels;
    },
    async createOrUpdate() {
      const params = {
        category_id: this.form.categoryId,
        number: this.form.number,
        level: this.form.level,
        location: this.form.location,
      };

      if (this.edit) {
        //to update you need the status property
        params.status = this.form.status;

        this.$emit("update", {
          number: this.room.number,
          room: params,
        });
      } else {
        this.$emit("create", params);
      }
    },
  },
};
</script>
