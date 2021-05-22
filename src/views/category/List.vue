<template>
  <loading v-if="loading"/>
  <div v-else>
    <v-row>
      <v-col cols="12" class="py-0">
        <button
          class="badge badge-pill badge-success shadow-success m-1 my-button"
          @click="openDialog()"
        >
          Registrar
        </button>
      </v-col>
      <v-col
        v-for="category in categories"
        :key="category.id"
        cols="12"
        md="4"
        sm="6"
      >
        <base-material-card class="mt-8 card-max-height" type="Bar">
          <template v-slot:image>
            <img
              style="height: 220px"
              class="card_img"
              :src="category.images.length > 0 ? category.images[0].url : ''"
              alt=""
            />
          </template>

          <div class="reveal-actions">
            <router-link
              :to="{
                name: 'categories.edit',
                params: { name: category.name },
              }"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ attrs, on }">
                  <v-btn v-bind="attrs" color="info" icon v-on="on">
                    <v-icon color="info"> mdi-magnify </v-icon>
                  </v-btn>
                </template>

                <span>Ver mas</span>
              </v-tooltip>
            </router-link>
            <router-link
              :to="{
                name: 'categories.edit',
                params: { name: category.name },
              }"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ attrs, on }">
                  <v-btn v-bind="attrs" color="warning" icon v-on="on">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>

                <span>Actualizar datos</span>
              </v-tooltip>
            </router-link>
          </div>
          <div class="d-flex justify-space-between" style="margin-top: -40px">
            <h4 class="card-title text-uppercase mt-2 ml-2">
              {{ category.name }}
            </h4>
            <v-chip class="mt-2 ml-2" draggable>
              <h2>S/. {{ category.price }}</h2>
            </v-chip>
          </div>

          <ul>
            <li
              v-for="(detail, i) in commaSeparatedList(category.details)"
              :key="i"
              class="font-weight-light mt-2"
              style="line-height: 1"
            >
              {{ detail }}
            </li>
          </ul>
          <template v-slot:actions>
            <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
            <span class="caption grey--text font-weight-light"
              >creado: {{ translatedDate(category.created_at) }}</span
            >
          </template>
        </base-material-card>
      </v-col>
    </v-row>
    <!-- Modal for create new role and edit -->
    <modal-form @create="create" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  components: {
    Loading: () => import("@/components/common/Loading"),
    ModalForm: () => import("./Create"),
  },
  data:() => ({
    loading: true,
  }),
  computed: {
    ...mapState("categories", ["categories", "errors"]),
  },
  async created() {
    await this.getAllCategories();
    this.loading = false
  },
  methods: {
    ...mapActions("categories", [
      "createCategory",
      "cleanErrors",
      "getAllCategories",
    ]),
    ...mapActions("dialog", ["openDialogWarning", "openDialogForm"]),
    ...mapActions("snackbar", ["showSnackbar"]),

    async create(data) {
      this.cleanErrors();
      await this.createCategory(data);
      this.existsErrors(data);
    },
    existsErrors(data) {
      const { name } = data;
      if (this.errors.length === 0) {
        this.openDialogForm(false);
        this.showSnackbar({
          color: "success",
          msg: "Acción realizada con exito!",
        });

        this.$router.push({
          name: "categories.edit",
          params: { name: name.toLowerCase() },
        });
      } else {
        this.showSnackbar({
          color: "error",
          msg: "No se pudo realizar la acción!",
        });
      }
    },
    openDialog() {
      this.cleanErrors();
      this.openDialogForm(true);
    },
    commaSeparatedList(l) {
      if (l !== null && l != undefined) {
        const list = l.split(",");
        const newList = list.slice(0, 4);
        if (newList.length >= 4) {
          newList[3] = newList[3] + "...";
        }
        return newList;
      }
    },
    translatedDate(date) {
      return moment(new Date(date)).format("LL hh:mm A");
    },
  },
};
</script>
<style>
.card-max-height {
  min-height: 390px;
}
.v-card--material:hover .v-card--material__heading {
  transform: translate3d(0, 0, 0);
  transition: all 300ms cubic-bezier(0.34, 1.61, 0.7, 1);
  position: relative;
  top: -60px;
}
.reveal-actions {
  display: flex;
  justify-content: center;
  position: relative;
  top: -35px;
}
.card_img {
  max-width: 100%;
  min-width: 100%;
  min-height: 100%;
  max-height: 100%;
  display: block;
  border-radius: 4px;
}
</style>