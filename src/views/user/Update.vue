<template>
  <loading v-if="loading"/>
  <v-row v-else>
    <v-col cols="12" md="8">
      <base-material-card color="warning">
        <template v-slot:heading>
          <div class="display-2 font-weight-light">
            {{isMyProfile
            ? "Mi perfil"
            : "Actualizar Datos del trabajador"
            }}
            
          </div>

          <div class="subtitle-1 font-weight-light">Complete su perfil</div>
        </template>
        <v-form @submit.prevent="update" enctype="multipart/form-data">
          <v-container class="py-0">
            <v-row>
              <v-col cols="12" md="4" sm="6">
                <v-select
                  v-model="form.roleId"
                  :items="roles"
                  item-text="name"
                  item-value="id"
                  label="Rol"
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
                  :error-messages="errors.last_name ? errors.last_name[0] : ''"
                />
              </v-col>
              <v-col cols="6" md="4" sm="6">
                <v-text-field
                  v-model="form.dni"
                  label="* Dni"
                  outlined
                  dense
                  required
                  :error-messages="errors.dni ? errors.dni[0] : ''"
                />
              </v-col>
              <v-col cols="6" md="4" sm="6">
                <v-text-field
                  v-model="form.phone"
                  label="* Telefono"
                  outlined
                  dense
                  required
                  :error-messages="errors.phone ? errors.phone[0] : ''"
                />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  outlined
                  dense
                  required
                  :error-messages="errors.email ? errors.email[0] : ''"
                />
              </v-col>
              <v-col cols="6" md="4" sm="6">
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
                  :error-messages="errors.password ? errors.password[0] : ''"
                  @click:append="form.showPassword = !form.showPassword"
                />
              </v-col>
              <v-col cols="6" md="4" sm="6">
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
                  :error-messages="
                    errors.password_confirmation
                      ? errors.password_confirmation[0]
                      : ''
                  "
                  @click:append="form.showPassword = !form.showPassword"
                />
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-select
                  v-model="form.status"
                  :items="form.statuses"
                  item-text="status"
                  item-value="value"
                  label="Estado"
                  dense
                  outlined
                  :error-messages="errors.status ? errors.status[0] : ''"
                />
              </v-col>
              <v-col cols="12" md="5" sm="6">
                <v-menu
                  v-model="form.datepicker"
                  :close-on-content-click="false"
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
                      :error-messages="
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
              <v-col cols="12" md="7" sm="12">
                <v-file-input
                  color="deep-purple accent-4"
                  counter
                  label="Cambiar foto de perfil"
                  placeholder="Seleccione una foto"
                  prepend-icon="mdi-camera"
                  show-size
                  outlined
                  dense
                  type="file"
                  name="image"
                  accept="image/*"
                  :clearable="false"
                  :error-messages="errors.image ? errors.image[0] : ''"
                  @change="getImage"
                />
              </v-col>
              <v-spacer />
              <div class="d-flex justify-end" style="width: 100%">
                <btn-router route="users" text="Volver" />
                <button
                  type="submit"
                  class="badge badge-pill badge-warning shadow-warning m-1 my-button"
                >
                  Actualizar cambios
                </button>
              </div>
            </v-row>
          </v-container>
        </v-form>
      </base-material-card>
    </v-col>
    <v-col cols="12" md="4" class="mt-10">
      <base-material-card class="v-card-profile  elevation-10" :avatar="profilePicture">
        <v-card-text class="text-center">
          <h6 class="display-1 mb-1 grey--text text-uppercase">
            ROL / {{ form.roleName }}
          </h6>

          <h4 class="display-2 font-weight-light mb-3 black--text">
            {{ form.name + " " + form.lastName }}
          </h4>

          <p class="font-weight-light grey--text">
            {{ form.roleDescription }}
          </p>

          <v-btn color="warning" rounded class="mr-0"> Follow </v-btn>
        </v-card-text>
      </base-material-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  name: "UpdateForm",
  components: {
    Loading: () => import("@/components/common/Loading"),
    BtnRouter: () => import("@/components/ui/BtnRouter"),
  },
  data() {
    return {
      loading: true,
      isMyProfile: false,
      form:{ 
        id: "",
        roleId: "",
        roleName: "",
        roleDescription: "",
        name: "",
        lastName: "",
        dni: "",
        phone: "",
        email: "",
        dateOfBirth: new Date().toISOString().substr(0, 10),
        password: "",
        passwordConfirmation: "",
        datepicker: false,
        showPassword: false,
        image: "",
        status: "",
        statuses: [
          {
            value: "enabled",
            status: "Habilitado",
          },
          {
            value: "disabled",
            status: "Inhabilitado",
          },
        ],
      },
      profilePicture: ""
    };
  },
  computed: {
    ...mapState("roles", ["roles"]),
    ...mapState("users", ["user", "errors"]),
    ...mapState("login", ["userAuth"]),

    computedDateFormattedMomentjs() {
      return this.form.dateOfBirth ? moment(this.form.dateOfBirth).format("LL") : "";
    },
    myRole() {
      const myRole = this.roles.filter((rol) => rol.id == this.form.roleId);
      return myRole.name;
    },
  },
  watch: {
    user() {
      this.form.id = this.user.id;
      this.form.roleId = this.user.role.id;
      this.form.roleName = this.user.role.attributes.name;
      this.form.roleDescription = this.user.role.attributes.description;
      this.form.name = this.user.name;
      this.form.lastName = this.user.last_name;
      this.form.dni = this.user.dni;
      this.form.phone = this.user.phone;
      this.form.email = this.user.email;
      this.form.status = this.user.status;
      this.form.dateOfBirth = this.user.date_of_birth;
      this.form.image = this.user.image.url;
      this.profilePicture = this.form.image
    },
  },
  async created() {
    this.cleanErrors();
    await this.getUserById(this.$route.params.dni);
    
    //if the user does not exist with the DNI entered by keyboard in the url
    if (this.user.dni) {
      await this.getAllRoles();
      if (this.userAuth.dni === this.user.dni) {
        this.isMyProfile = true
      }      
    }
    else {
      return this.$router.go(-1)
    }
    this.loading = false
  },
  methods: {
    ...mapActions("roles", ["getAllRoles"]),
    ...mapActions("users", ["updateUser", "getUserById", "cleanErrors"]),
    ...mapActions("snackbar", ["showSnackbar"]),

    async update() {
      this.cleanErrors();
      
      const params = new FormData();
      params.append("_method", "PUT");
      params.append("role_id", this.form.roleId);
      params.append("name", this.form.name);
      params.append("last_name", this.form.lastName);
      params.append("dni", this.form.dni);
      params.append("phone", this.form.phone);
      params.append("email", this.form.email);
      params.append("status", this.form.status);
      params.append("date_of_birth", this.form.dateOfBirth);
      params.append("password", this.form.password);
      params.append("password_confirmation", this.form.passwordConfirmation);
      params.append("image", this.form.image);

      await this.updateUser({ id: this.user.id, user: params });

      if (this.errors.length === 0) {
        this.showSnackbar({
          color: "success",
          msg: "Acción realizada con exito!",
        });
        await this.getUserById(this.$route.params.dni);
      } else {
        this.showSnackbar({
          color: "success",
          msg: "No se pudo realizar la acción!",
        });
      }

      setTimeout(() => {
        if (this.$route.params.dni !== this.form.dni) {
          this.$router.push({ name: "users" });
        }
      }, 1000);
    },
    getImage(e) {
        this.form.image = e;
    },
  },
};
</script>
