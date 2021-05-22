<template>
  <loading v-if="loading"/>
  <v-row v-else>
    <v-col cols="12" md="8">
      <base-material-card color="success">
        <template v-slot:heading>
          <div class="display-2 font-weight-light">
            Registrar un nuevo Trabajador
          </div>

          <div class="subtitle-1 font-weight-light">Complete su perfil</div>
        </template>
        <v-form @submit.prevent="createNewUser">
          <v-container class="py-0">
            <v-row>
              <v-col class="d-flex" cols="12" md="4" sm="6">
                <v-select
                  v-model="form.roleId"
                  :items="roles"
                  item-text="name"
                  item-value="id"
                  label="* Roles"
                  placeholder="Seleccione el Rol"
                  dense
                  outlined
                  :error-messages="errors.role_id ? errors.role_id[0] : ''"
                />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="form.name"
                  label="* Nombres"
                  outlined
                  dense
                  required
                  autocomplete="off"
                  :error-messages="errors.name ? errors.name[0] : ''"
                />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="form.lastName"
                  label="* Apellidos"
                  outlined
                  dense
                  required
                  autocomplete="off"
                  :error-messages="errors.last_name ? errors.last_name[0] : ''"
                />
              </v-col>
              <v-col cols="6" md="3" sm="6">
                <v-text-field
                  v-model="form.dni"
                  label="* Dni"
                  outlined
                  dense
                  required
                  autocomplete="off"
                  :error-messages="errors.dni ? errors.dni[0] : ''"
                />
              </v-col>
              <v-col cols="6" md="3" sm="6">
                <v-text-field
                  v-model="form.phone"
                  label="* Telefono"
                  outlined
                  dense
                  required
                  autocomplete="off"
                  :error-messages="errors.phone ? errors.phone[0] : ''"
                />
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  outlined
                  dense
                  required
                  autocomplete="off"
                  :error-messages="errors.email ? errors.email[0] : ''"
                />
              </v-col>
              <v-col cols="6" md="3" sm="6">
                <v-text-field
                  v-model="form.password"
                  :append-icon="form.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="form.showPassword ? 'text' : 'password'"
                  name="input-10-2"
                  label="Contraseña"
                  hint="Al menos 8 carácteres"
                  class="input-group--focused"
                  outlined
                  dense
                  required
                  autocomplete
                  :error-message="errors.password ? errors.password[0] : ''"
                  @click:append="form.showPassword = !form.showPassword"
                />
              </v-col>
              <v-col cols="6" md="3" sm="6">
                <v-text-field
                  v-model="form.passwordConfirmation"
                  :append-icon="form.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="form.showPassword ? 'text' : 'password'"
                  name="input-10-2"
                  label="Confirmar Contraseña"
                  hint="Al menos 8 carácteres"
                  class="input-group--focused"
                  outlined
                  dense
                  required
                  autocomplete
                  :error-message="
                    errors.password_confirmation
                      ? errors.password_confirmation[0]
                      : ''
                  "
                  @click:append="form.showPassword = !form.showPassword"
                />
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-menu
                  :close-on-content-click="false"
                  v-model="form.datepicker"
                  max-width="290"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="computedDateFormattedMomentjs"
                      clearable
                      label="Fecha de Nacimiento"
                      readonly
                      outlined
                      dense
                      :error-message="
                        errors.date_of_birth ? errors.date_of_birth[0] : ''
                      "
                      v-on="on"
                      @click:clear="form.dateOfBirth = null"
                    />
                  </template>
                  <v-date-picker
                    v-model="form.dateOfBirth"
                    locale="es"
                    :max="new Date().toISOString().substr(0, 10)"
                    @change="form.datepicker = false"
                  />
                </v-menu>
              </v-col>
              <v-spacer />
              <div style="width: 100%" class="d-flex justify-end">
                <btn-router route="users" text="Volver" />
                <button
                  type="submit"
                  class="badge badge-pill badge-success shadow-success m-1 my-button"
                  style="color: white"
                >
                  Registrar
                </button>
              </div>
            </v-row>
          </v-container>
        </v-form>
      </base-material-card>
    </v-col>
    <v-col cols="12" md="4" class="mt-10">
      <base-material-card
        class="v-card-profile"
        avatar="@/assets/without-image.jpg"
      >
        <v-card-text class="text-center">
          <h6 class="display-1 mb-1 grey--text">CEO / CO-FOUNDER</h6>

          <h4 class="display-2 font-weight-light mb-3 black--text">
            Alec Thompson
          </h4>

          <p class="font-weight-light grey--text">
            Don't be scared of the truth because we need to restart the human
            foundation in truth And I love you like Kanye loves Kanye I love
            Rick Owens’ bed design but the back is...
          </p>

          <v-btn color="success" rounded class="mr-0"> Follow </v-btn>
        </v-card-text>
      </base-material-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  components: {
    Loading: () => import("@/components/common/Loading"),
    BtnRouter: () => import("@/components/ui/BtnRouter"),
  },
  data() {
    return {
      loading: true,
      form: {
        roleId: "",
        name: "",
        lastName: "",
        dni: "",
        phone: "",
        email: "",
        dateOfBirth: new Date().toISOString().substr(0, 10),
        password: "",
        passwordConfirmation: "",
        showPassword: false,
        datepicker: false,
      }
    };
  },
  computed: {
    ...mapState("roles", ["roles"]),
    ...mapState("users", ["user", "errors"]),

    computedDateFormattedMomentjs() {
      return this.form.dateOfBirth ? moment(this.form.dateOfBirth).format("LL") : "";
    },
  },
  async created() {
    this.cleanErrors();
    await this.getAllRoles();
    this.loading = false
    if (this.roles.length === 0) {
      confirm("Primero debe registrar un Rol.");
      window.location.href = process.env.VUE_APP_URL + "roles";
    }
  },
  methods: {
    ...mapActions("roles", ["getAllRoles"]),
    ...mapActions("users", ["createUser", "cleanErrors"]),
    ...mapActions("snackbar", ["showSnackbar"]),

    async createNewUser() {
      this.cleanErrors();

      const params = {
        role_id: this.form.roleId,
        name: this.form.name,
        last_name: this.form.lastName,
        dni: this.form.dni,
        phone: this.form.phone,
        email: this.form.email,
        date_of_birth: this.form.dateOfBirth,
        password: this.form.password,
        password_confirmation: this.form.passwordConfirmation,
      };

      await this.createUser(params);

      if (this.errors.length === 0) {
        this.showSnackbar({
          color: "success",
          msg: "Acción realizada con exito!",
        });

        this.$router.push({ name: "users.edit", params: { dni: this.form.dni } });
      } else {
        this.showSnackbar({
          color: "error",
          msg: "No se pudo realizar la acción!",
        });
      }
    },
  },
};
</script>
