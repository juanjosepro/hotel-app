<template>
  <loading v-if="loading"/>
  <div v-else>
    <v-row class="ml-1 mb-3">
      <button
        class="badge badge-pill badge-success shadow-success my-button"
        @click="openDialog()"
      >
        Registrar
      </button>
    </v-row>

    <!-- Modal for create new role and edit -->
    <modal-form @create="create" @update="update" />

    <v-row>
      <v-col cols="12" md="4" sm="6" v-for="(rol, i) in roles" :key="rol.id">
        <div class="target elevation-20">
          <div class="target__body">
            <div class="target__container">
              <div class="target__icon">
                <v-avatar :color="colors[i]">
                  <span class="white--text headline text-uppercase">{{
                    firstLetter(rol.name)
                  }}</span>
                </v-avatar>
              </div>
              <div>
                <h4 class="target__title">{{ rol.name }}</h4>
                <p class="target__content">
                  {{ max200Letters(rol.description) }}
                </p>
              </div>
            </div>
          </div>
          <div class="target__actions" style="color:orange">
            <b @click="openDialog(rol.id)">Editar
              <v-icon dense class="mr-2" style="color:orange">
                mdi-pencil
              </v-icon>
            </b>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import moment from "moment";

export default {
  components: {
    Loading: () => import("@/components/common/Loading"),
    ModalForm: () => import("./ModalForm"),
  },
  data() {
    return {
      loading: true,
      colors: [
        "red",
        "amber",
        "blue",
        "brown",
        "teal",
        "purple",
        "orange",
        "pink",
        "purple",
        "indigo",
        "cyan",
        "lime",
        "green",
        "black",
        "yellow",
        "grey",
      ],
    };
  },
  computed: {
    ...mapState("roles", ["roles", "errors"]),
    ...mapGetters("roles", ["getRole"]),
  },
  async created() {
    await this.getAllRoles();
    this.loading = false
  },
  methods: {
    ...mapActions("roles", [
      "createRole",
      "updateRole",
      "getAllRoles",
      "cleanErrors",
    ]),
    ...mapActions("dialog", ["openDialogWarning", "openDialogForm"]),
    ...mapActions("snackbar", ["showSnackbar"]),

    async update(data) {
      this.cleanErrors();
      await this.updateRole(data);
      this.existsErrors();
    },
    async create(data) {
      this.cleanErrors();
      await this.createRole(data);
      this.existsErrors();
    },
    existsErrors() {
      if (this.errors.length === 0) {
        this.openDialogForm(false);
        this.showSnackbar({
          color: "success",
          msg: "Acción realizada con exito!",
        });
      } else {
        this.showSnackbar({
          color: "error",
          msg: "No se pudo realizar la acción!",
        });
      }
    },
    openDialog(id = "") {
      this.cleanErrors();
      this.openDialogForm(true);
      if (id !== "") this.getRole(id);
    },
    firstLetter(l) {
      return l.substring(0, 1);
    },
    max200Letters(l) {
      return l.substring(0, 60) + "...";
    },
    translatedDate(date) {
      return moment(new Date(date)).format("LL hh:mm A");
    },
  },
};
</script>

<style lang="scss" src="@/sass/my-style/_target.scss">
//985050261
