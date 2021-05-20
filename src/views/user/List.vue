<template>
  <loading v-if="loading"/>
  <div v-else>
    <base-material-card
      :color="showDisabledUsers ? 'danger' : 'success'"
      icon="mdi-clipboard-text"
      :title="`LISTA DE USUARIOS ${
        showDisabledUsers ? 'INHABILITADOS' : 'HABILITADOS'
      }`"
      class="px-5 py-3"
    >
      <div class="my-base-card-header">
        <div>
          <router-link :to="{ name: 'users.create' }">
            <button
              class="badge badge-pill badge-success shadow-success m-1 my-button"
            >
              Registrar
            </button>
          </router-link>

          <button
            :class="{
              'badge badge-pill m-1 my-button': true,
              'badge-primary shadow-primary': showDisabledUsers,
              'badge-danger shadow-danger': !showDisabledUsers,
            }"
            @click="listUsers(!showDisabledUsers)"
          >
            {{
              `Ver usuarios ${
                showDisabledUsers ? "habilitados" : "inhabilitados"
              }`
            }}
          </button>
        </div>

        <div class="data-table-search">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            outlined
            dense
            single-line
            hide-details
          />
        </div>
      </div>

      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        sort-by="role.name"
        locale="es"
        :loading="loading"
        loading-text="Cargando datos"
        no-results-text="No se encontraron coincidencias..."
        no-data-text="Sin datos que mostrar..."
        class="m-data-table"
      >
        <template v-slot:[`item.tools`]="{ item }">
          <router-link :to="{ name: 'users.edit', params: { dni: item.dni } }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mr-2" v-bind="attrs" v-on="on">
                  mdi-account-search
                </v-icon>
              </template>
              <small>Ver mas</small>
            </v-tooltip>
          </router-link>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" @click="selectDisableUser(item)">
                {{
                  textStatus === "Habilitar"
                    ? "mdi-account-check"
                    : "mdi-account-off"
                }}
              </v-icon>
            </template>
            <small>
              {{ textStatus === "Habilitar" ? "Habilitar" : "Inhabilitar" }}
            </small>
          </v-tooltip>
        </template>
      </v-data-table>
    </base-material-card>

    <modal-warning
      :text="`¿Desea ${textStatus} al usuario ${
        user.name + ' ' + user.last_name
      }?`"
      :text-btn="textStatus"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { EventBus } from "@/Event.js";

export default {
  components: {
    Loading: () => import("@/components/common/Loading"),
    ModalWarning: () => import("@/components/common/ModalWarning"),
  },
  data() {
    return {
      loading: false,
      showDisabledUsers: false,
      search: "",
      textStatus: "Inhabilitar",
      user: {},
      headers: [
        { text: "Rol", value: "role.attributes.name" },
        { text: "Nombre", value: "name" },
        { text: "Apellidos", value: "last_name" },
        { text: "Dni", value: "dni" },
        { text: "Telefono", value: "phone" },
        { text: "Acciones", value: "tools" },
      ],
    };
  },
  computed: {
    ...mapState("users", ["users"]),
  },
  beforeDestroy() {
    EventBus.$off();
  },
  async created() {
    await this.listUsers(this.showDisabledUsers);
    this.loading = false
    EventBus.$on(
      "the-user-confirm-the-warning-modal",
      this.disabledOrEnabledUser
    );
  },
  methods: {
    ...mapActions("users", ["getAllUsers", "disableUser"]),
    ...mapActions("dialog", ["openDialogWarning"]),
    ...mapActions("snackbar", ["showSnackbar"]),

    async listUsers(show) {
      this.showDisabledUsers = show;

      if (this.showDisabledUsers) {
        this.textStatus = "Habilitar";
        await this.getAllUsers("disabled");
        this.existsUsers("Inhabilitados");
      } else {
        this.textStatus = "Inhabilitar";
        /* Sin parametros por defecto trae a los usuarios habilitados */
        await this.getAllUsers();
        this.existsUsers("Habilitados");
      }
    },
    existsUsers(text) {
      if (this.users.length === 0) {
        this.showSnackbar({
          color: "blue",
          msg: `No hay usuarios ${text}...`,
        });
      } else {
        this.showSnackbar({
          color: "success",
          msg: `Usuarios ${text}...`,
        });
      }
    },
    selectDisableUser(user) {
      this.user = user;
      this.openDialogWarning(true);
    },
    async disabledOrEnabledUser() {
      await this.disableUser(this.user.id);
      if (this.textStatus == "Habilitar") {
        this.showSnackbar({
          color: "success",
          msg: "Usuario Habilitado Satisfactoriamente",
        });
      } else {
        this.showSnackbar({
          color: "success",
          msg: "Usuario InHabilitado Satisfactoriamente",
        });
      }
      this.listUsers(!this.showDisabledUsers);
      this.openDialogWarning(false);
    },
  },
};
</script>
<style scoped>
.data-table-search {
  float: right;
}

.my-base-card-header {
  position: absolute;
  top: 40px;
  left: 120px;
  display: flex;
  justify-content: space-between;
  min-width: 87%;
}

@media (max-width: 1300px) {
  .my-base-card-header {
    min-width: 85%;
  }
}

@media (max-width: 1120px) {
  .my-base-card-header {
    min-width: 80%;
  }
}

@media (max-width: 640px) {
  .my-base-card-header {
    min-width: 75%;
  }
  .m-data-table {
    margin-top: 30px;
  }
}

@media (max-width: 530px) {
  .my-base-card-header {
    min-width: 70%;
    flex-direction: column;
  }
}
</style>