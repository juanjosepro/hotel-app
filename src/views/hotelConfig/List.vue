<template>
  <loading v-if="loading" />
  <v-row v-else>
    <v-col cols="12" md="7">
      <v-card class="elevation-20">
        <v-form
          ref="main"
          @submit.prevent="update"
          enctype="multipart/form-data"
        >
          <v-card-title class="d-flex justify-space-between mb-3">
            <h4 class="text-uppercase font-weight-black">Datos del Hotel</h4>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" sm="6" md="6">
                <v-text-field v-model="form.name" label="Nombre" outlined dense />
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field v-model="form.ruc" label="RUC" outlined dense />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="form.location"
                  label="Ubicación"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="5" sm="5" md="5">
                <v-text-field v-model="form.phone" label="Telefono" outlined dense />
              </v-col>
              <v-col cols="5" sm="5" md="5">
                <v-text-field v-model="form.email" label="Email" outlined dense />
              </v-col>
              <v-col cols="2" sm="2" md="2">
                <v-text-field v-model="form.levels" label="Niveles" outlined dense />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  v-model="form.description"
                  rows="3"
                  label="Descripción"
                  outlined
                  name="input-7-4"
                />
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-file-input
                  type="file"
                  name="image"
                  accept="image/*"
                  label="Imagen del Hotel"
                  color="deep-purple accent-4"
                  placeholder="Seleccione una foto"
                  prepend-icon="mdi-camera"
                  outlined
                  show-size
                  dense
                  :clearable="false"
                  :error-messages="`${errors.image ? errors.image[0] : ''}`"
                  @change="getImage"
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip
                      v-if="index < 2"
                      color="deep-purple accent-4"
                      dark
                      label
                      small
                    >
                      {{ text }}
                    </v-chip>

                    <span
                      v-else-if="index === 2"
                      class="overline grey--text text--darken-3 mx-2"
                    >
                      +{{ files.length - 2 }} File(s)
                    </span>
                  </template>
                </v-file-input>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-file-input
                  type="file"
                  name="logo"
                  accept="image/*"
                  label="Logo del Hotel"
                  color="deep-purple accent-4"
                  placeholder="Seleccione un logo"
                  prepend-icon="mdi-image"
                  outlined
                  show-size
                  dense
                  :clearable="false"
                  :error-messages="`${errors.image ? errors.image[0] : ''}`"
                  @change="getLogo"
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip
                      v-if="index < 2"
                      color="deep-purple accent-4"
                      dark
                      label
                      small
                    >
                      {{ text }}
                    </v-chip>

                    <span
                      v-else-if="index === 2"
                      class="overline grey--text text--darken-3 mx-2"
                    >
                      +{{ files.length - 2 }} File(s)
                    </span>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="py-0">
            <v-spacer />
            <v-btn type="submit" class="font-weight-black" color="error" text>
              Actualizar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="12" md="5">
      <v-card class="mx-auto elevation-20" max-width="400" height="300">
        <v-card-title>
          <h4 class="text-uppercase font-weight-black">Imagen de el Hotel</h4>
        </v-card-title>
        <v-card-text>
          <images
            :image="`${form.changeImage ? loadImagen : form.image}`"
            :alt="hotel.name"
            style="height: 250px"
          />
        </v-card-text>
      </v-card>
      <br />
      <v-card class="mx-auto elevation-20" width="200" height="200">
        <v-card-title>
          <h5 class="text-uppercase font-weight-black">Logo de el Hotel</h5>
        </v-card-title>
        <v-card-text>
            <images
              :image="`${form.changeLogo ? loadLogo : form.logo}`"
              :alt="hotel.name"
              style="height: 150px"
            />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Loading: () => import("@/components/common/Loading"),
    Images: () => import("@/components/common/Image"),
  },
  data() {
    return {
      loading: true,
      form: {
        id: "",
        name: "",
        ruc: "",
        location: "",
        phone: "",
        email: "",
        levels: "",
        description: "",
        image: "",
        logo: "",
        changeImage: false,
        imagenMiniatura: "",
        changeLogo: false,
        logoMiniatura: "",
      }
    };
  },
  computed: {
    ...mapState("hotel", ["hotel", "errors"]),
    loadImagen() {
      return this.form.imagenMiniatura;
    },
    loadLogo() {
      return this.form.logoMiniatura;
    },
  },
  async created() {
    this.clearErrors();
    await this.getHotel();
    this.form.id = this.hotel.id;
    this.form.name = this.hotel.name;
    this.form.ruc = this.hotel.ruc;
    this.form.location = this.hotel.location;
    this.form.phone = this.hotel.phone;
    this.form.email = this.hotel.email;
    this.form.levels = this.hotel.levels;
    this.form.description = this.hotel.description;
    this.form.image = this.hotel.image;
    this.form.logo = this.hotel.logo;
    this.loading = false
  },
  methods: {
    ...mapActions("hotel", ["getHotel", "updateHotel", "clearErrors"]),
    ...mapActions("snackbar", ["showSnackbar"]),

    update() {
      this.clearErrors();
      const params = new FormData();
      params.append("_method", "PUT");
      params.append("name", this.form.name);
      params.append("ruc", this.form.ruc);
      params.append("location", this.form.location);
      params.append("phone", this.form.phone);
      params.append("email", this.form.email);
      params.append("levels", this.form.levels);
      params.append("description", this.form.description);
      params.append("image", this.form.image);
      params.append("logo", this.form.logo);

      this.updateHotel({ id: this.form.id, setting: params });

      if (this.errors.length === 0) {
        this.showSnackbar({
          color: "success",
          msg: "Accion realizada con exito!",
        });
      } else {
        this.showSnackbar({
          color: "error",
          msg: "No se pudo realizar la acción!",
        });
      }
    },
    getImage(e) {
      if (e) {
        this.form.image = e;
        this.form.changeImage = true;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.imagenMiniatura = e.target.result;
        };
        reader.readAsDataURL(e);
      } else {
        if (this.hotel.image.url) {
          this.form.image = this.hotel.image.url;
        } else {
          this.form.image = WithoutImage;
        }
        this.form.changeImage = false;
      }
    },
    getLogo(e) {
      if (e) {
        this.form.logo = e;
        this.form.changeLogo = true;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.logoMiniatura = e.target.result;
        };
        reader.readAsDataURL(e);
      } else {
        if (this.hotel.image.url) {
          this.form.logo = this.hotel.image.url;
        } else {
          this.form.logo = WithoutImage;
        }
        this.form.changeLogo = false;
      }
    },
  },
};
</script>

<style></style>
