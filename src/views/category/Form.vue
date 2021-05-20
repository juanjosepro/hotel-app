<template>
  <loading v-if="loading"/>
  <v-row v-else>
    <v-col cols="12" sm="12" md="6" class="mt-3">
      <base-material-card
        :color="edit ? 'warning' : 'success'"
        class="elevation-20"
      >
        <template v-slot:heading>
          <div class="display-2 font-weight-light">
            {{
              edit
                ? "Actualizarlos Datos"
                : "Registrar nueva Categoria de Habitacion"
            }}
          </div>

          <div class="subtitle-1 font-weight-light">Complete los Campos</div>
        </template>
        <v-form
          @submit.prevent="validate"
          enctype="multipart/form-data"
          ref="form"
        >
          <v-container class="py-0">
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="form.name"
                  label="* Nombre de la categoria"
                  outlined
                  dense
                  required
                  autocomplete="off"
                  :rules="nameRules"
                  :error-messages="errors.name ? errors.name[0] : ''"
                />
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <div class="container-input-money">
                  <label
                    class="input-money-label"
                    for="price"
                    >* Precio</label
                  >
                  <span class="input-money-prefix">S/</span>
                  <money
                    class="input-money"
                    id="price"
                    v-model="form.price"
                    v-bind="money"
                  />
                  <small class="red--text" style="font-size: 11.5px">{{
                    errors.price ? errors.price[0] : ""
                  }}</small>
                </div>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-autocomplete
                  v-model="values"
                  :items="items"
                  outlined
                  label="* Detalles de la categoria"
                  clearable
                  deletable-chips
                  multiple
                  small-chips
                  required
                  :error-messages="errors.details ? errors.details[0] : ''"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="12" sm="12">
                <v-file-input
                  v-model="form.images"
                  color="deep-purple accent-4"
                  label="Cambiar foto de perfil"
                  placeholder="Seleccione una foto"
                  prepend-icon="mdi-camera"
                  show-size
                  multiple
                  counter
                  outlined
                  dense
                  type="file"
                  name="images"
                  accept="image/*"
                  :clearable="true"
                  :error-messages="`${errors.image ? errors.image[0] : ''}`"
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip
                      v-if="index < 5"
                      color="deep-purple accent-4"
                      dark
                      label
                      small
                    >
                      {{ text }}
                    </v-chip>

                    <span
                      v-else-if="index === 5"
                      class="overline grey--text text--darken-3 mx-2"
                    >
                      +{{ form.images.length - 5 }} File(s)
                    </span>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <v-spacer />
          <div class="d-flex justify-end">
            <btn-router v-if="edit" route="categories" text="Volver" />
            <button
              :class="`
                  badge badge-pill m-1 my-button 
                  ${
                    edit
                      ? 'badge-warning shadow-warning'
                      : 'badge-success shadow-success'
                  }
                `"
              type="submit"
            >
              {{ edit ? "Actualizarlos Cambios" : "Finalizar Registro" }}
            </button>
          </div>
        </v-form>
      </base-material-card>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-card class="elevation-20">
            <v-card-title>
              <h4 class="text-uppercase font-weight-black">
                Galeria de Imagenes
              </h4>
            </v-card-title>
            <v-card-text class="py-0">
              <v-row>
                <v-col cols="12" md="12" sm="12">
                  <v-carousel
                    class="carousel"
                    cycle
                    height="350"
                    hide-delimiter-background
                    show-arrows-on-hover
                  >
                    <v-carousel-item
                      v-for="(slide, i) in slides"
                      :key="i"
                      :src="slide.url"
                    />
                  </v-carousel>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col v-if="slides.length > 1" cols="12" sm="12" md="12">
          <v-card class="elevation-20">
            <v-card-title><h3>¿Desea eliminar alguna imagen?</h3></v-card-title>
            <v-card-text>
              <div class="m-gallery-container">
                <div
                  class="m-gallery-items"
                  v-for="image in slides"
                  :key="image.id"
                >
                  <span
                    @click="openDialogForRemove(image.id)"
                    class="m-gallery-item-remove"
                    >x</span
                  >
                  <img :src="image.url" alt="" />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <modal-warning
      text="¿Desea eliminar esta imagen de la galeria?"
      text-btn="Eliminar"
    />
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { noBackButtonNavigator } from "@/shared/mixins/noBackButtonNavigator";
import { Money } from "v-money";
import { EventBus } from "@/Event.js";
import { _axios } from "@/plugins/axios";

export default {
  components: {
    Money,
    Loading: () => import("@/components/common/Loading"),
    BtnRouter: () => import("@/components/ui/BtnRouter"),
    ModalWarning: () => import("@/components/common/ModalWarning"),
  },
  mixins: [noBackButtonNavigator],
  data() {
    return {
      loading: true,
      edit: false,
      paramName: "",
      imageId: "",
      form: {
        name: "",
        price: "",
        details: "",
        images: []
      },
      items: [
        "tv satelital",
        "internet wifi",
        "estacionamiento",
        "aire acondicionado",
        "teléfono",
        "vista al jardín",
      ],
      values: [],
      slides: [],
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: "",
        precision: 2,
        masked: true,
      },
      nameRules: [
        (v) => !!v || "El campo nombre es requerido",
        (v) =>
          (v && v.length >= 3) ||
          "El campo nombre debe tener más de 10 caracteres.",
      ],
      priceRules: [(v) => !!v || "El campo precio es requerido"],
    };
  },
  computed: {
    ...mapState("categories", ["category", "errors"]),
  },
  watch: {
    category() {
      this.form.name = this.category.name;
      this.form.price = this.category.price;
      this.values = this.category.details
        ? this.category.details.split(",")
        : "";
      this.slides = this.category.images;
    },
  },
  async created() {
    this.paramName = this.$route.params.name;
    await this.getCategoryByName(this.paramName);

    //if the room does not exist with the NAME entered by keyboard in the url
    if (this.category.name) {
      if (this.category.details == null) this.mixinsNoBackButton();
      else this.edit = true;
    } else {
      return this.$router.go(-1)
    }

    this.loading = false
    EventBus.$on("the-user-confirm-the-warning-modal", this.removeGalleryImage);
  },
  methods: {
    ...mapActions("categories", [
      "getAllCategories",
      "updateCategory",
      "getCategoryByName",
      "cleanErrors",
    ]),
    ...mapActions("snackbar", ["showSnackbar"]),
    ...mapActions("dialog", ["openDialogWarning"]),

    validate() {
      if (this.$refs.form.validate()) {
        this.update();
      } else {
        this.mixinsNoBackButton();
      }
    },
    async update() {
      this.cleanErrors();
      let details = "";
      this.values.forEach((element, i) => {
        if (i === 0) {
          details = element;
        } else {
          details = details + "," + element;
        }
      });

      const params = new FormData();
      params.append("_method", "PUT");
      params.append("name", this.form.name);
      params.append("price", this.form.price);
      params.append("details", details);
      
      for (let i = 0; i < this.form.images.length; i++) {
        let image = this.form.images[i];
        params.append(`images['${i}']`, image);
      }

      await this.updateCategory({ name: this.category.name, category: params });

      if (this.errors.length === 0) {
        this.showSnackbar({
          color: "success",
          msg: "Acción realizada con exito!",
        });
        this.edit = true;
        setTimeout(() => {
          if (this.paramName !== this.form.name) {
            this.$router.push({ name: "categories" });
          }
        }, 1000);
      } else {
        this.showSnackbar({
          color: "error",
          msg: "No se pudo realizar la opción!",
        });
      }
    },
    openDialogForRemove(id) {
      this.openDialogWarning(true);
      this.imageId = id;
    },
    removeGalleryImage() {
      _axios
        .delete("remove-an-image-from-gallery/" + this.imageId)
        .then((res) => {
          this.getCategoryByName(this.paramName);
          this.openDialogWarning(false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>

.container-input-money {
  border-radius: 5px;
  position: relative;
  min-height: 40px;
}
.input-money-label {
  position: absolute;
  top: -9px;
  left: 10px;
  padding: 0 3px;
  color: #9e9e9e;
  background: #ffffff;
  font-size: 10px;
  line-height: 20px;
}
.input-money-prefix {
  position: absolute;
  top: 10px;
  left: 5px;
}
.input-money {
  padding: 9px 22px;
  border: 1px solid #9e9e9e;
  border-radius: 5px;
  width: 100%;
}
.input-money:focus {
  border: 2px solid #4caf50;
  outline: none;

  //no working
  .input-money-label {
    color: #4caf50;
  }
  .input-money-prefix {
    top: 13px;
  }
}

.carousel {
  border: 1px solid #eee;
  border-radius: 10px;
  border-color: #9e9e9e;
}
.m-gallery-container {
  display: flex;
  flex-wrap: wrap;
}
.m-gallery-items {
  position: relative;
  margin: 1em;
  border-radius: 5px;
  border: 1px solid #545d64;
  display: flex;
  justify-content: flex-end;

  @media (min-width: 400px) {
    width: calc(50% - 2em);
    height: 100px;
  }

  @media (min-width: 700px) {
    width: calc(33.33% - 2em);
  }

  @media (min-width: 1000px) {
    width: calc(20% - 2em);
    height: 60px;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    transition: all 0.2s;
  }

  .m-gallery-item-remove {
    position: absolute;
    top: -8px;
    right: -8px;
    color: white;
    background: red;
    padding: 0 3px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
  }

  &:hover {
    .m-gallery-item-remove {
      transform: scale(1.5);
    }
  }
}
</style>
