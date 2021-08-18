<template>
  <loading v-if="loading"/>
  <div v-else>
    <div class="tags mb-4">
      <!-- style="display: flex; justify-content: flex-end; margin-bottom: 10px" -->
      <span class="badge badge-pill badge-success shadow-success m-1"
        >Disponible</span
      >
      <span class="badge badge-pill badge-danger shadow-danger m-1"
        >Ocupado</span
      >
      <span class="badge badge-pill badge-primary shadow-primary m-1"
        >En Limpiesa</span
      >
      <span class="badge badge-pill badge-warning shadow-warning m-1"
        >En Mantenieminto</span
      >
      <span class="badge badge-pill badge-dark shadow-dark m-1"
        >Inhabilitado</span
      >
    </div>

    <v-card v-if="showCardIfDataExists" class="elevation-20">
      <v-tabs v-model="tab">
        <v-tab v-for="(room, i) in rooms" :key="i">
          {{ room.tab.name }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(room, i) in rooms"
          :key="i"
          style="min-height: 400px"
        >
          <v-container>
            <v-card flat>
              <v-row>
                <v-col
                  v-for="r in room.content"
                  :key="r.id"
                  md="3"
                  sm="4"
                  cols="12"
                >
                  <v-card
                    v-if="r.status === 'available'"
                    height="100"
                    class="gradient-ohhappiness"
                  >
                    <v-card-text>
                      <div class="m-card-container m-text-black">
                        <div class="section-1">
                          <h4 class="m-card-number">#{{ r.number }}</h4>
                          <h5 class="m-card-location">{{ r.location }}</h5>
                          <h4 class="m-card-level">Nivel {{ r.level }}</h4>
                        </div>
                        <div class="section-2">
                          <h4 class="m-card-price">S/. {{ r.price }}</h4>
                          <router-link
                            :to="{
                              name: 'reception.hospedar',
                              params: { number: r.number },
                            }"
                            class="m-card-link m-text-black"
                          >
                            <v-icon class="m-text-black"> mdi-comment-arrow-right </v-icon>
                            Hospedar
                          </router-link>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                  <v-card
                    v-if="r.status === 'occupied'"
                    height="100"
                    class="gradient-ibiza"
                  >
                    <v-card-text>
                      <div class="m-card-container m-text-white">
                        <div class="section-1">
                          <h4 class="m-card-number">#{{ r.number }}</h4>
                          <h5 class="m-card-location">{{ r.location }}</h5>
                          <h4 class="m-card-level">Nivel {{ r.level }}</h4>
                        </div>
                        <div class="section-2">
                          <h4 class="m-card-price">S/. {{ r.price }}</h4>
                          <router-link
                            :to="{
                              name:
                                'reception.more-information-about-the-guest',
                              params: { number: r.number },
                            }"
                            class="m-card-link m-text-white"
                          >
                          <v-icon class="m-text-white" right> mdi-comment-arrow-right </v-icon>
                            Ver mas
                          </router-link>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                  <v-card
                    v-if="r.status === 'maintenance'"
                    height="100"
                    class="gradient-warning"
                  >
                    <v-card-text>
                      <div class="m-card-container m-text-white">
                        <div class="section-1">
                          <h4 class="m-card-number">#{{ r.number }}</h4>
                          <h5 class="m-card-location">{{ r.location }}</h5>
                          <h4 class="m-card-level">Nivel {{ r.level }}</h4>
                        </div>
                        <div class="section-2">
                          <h4 class="m-card-price">S/. {{ r.price }}</h4>
                          <a
                            class="m-card-link m-text-white"
                            @click="changeStatusRoom(r.number)"
                          >
                          <v-icon class="m-text-white" right> mdi-comment-arrow-right </v-icon>
                            Cambiar estado
                          </a>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                  <v-card
                    v-if="r.status === 'cleaning'"
                    height="100"
                    class="gradient-info"
                  >
                    <v-card-text>
                      <div class="m-card-container m-text-white">
                        <div class="section-1">
                          <h4 class="m-card-number">#{{ r.number }}</h4>
                          <h5 class="m-card-location">{{ r.location }}</h5>
                          <h4 class="m-card-level">Nivel {{ r.level }}</h4>
                        </div>
                        <div class="section-2">
                          <h4 class="m-card-price">S/. {{ r.price }}</h4>
                          <a
                            class="m-card-link m-text-white"
                            @click="changeStatusRoom(r.number)"
                          >
                          <v-icon class="m-text-white" right> mdi-comment-arrow-right </v-icon>
                            Cambiar estado
                          </a>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                  <v-card
                    v-if="r.status === 'disabled'"
                    height="100"
                    class="gradient-secondary"
                  >
                    <v-card-text>
                      <div class="m-card-container m-text-white">
                        <div class="section-1">
                          <h4 class="m-card-number">#{{ r.number }}</h4>
                          <h5 class="m-card-location">{{ r.location }}</h5>
                          <h4 class="m-card-level">Nivel {{ r.level }}</h4>
                        </div>
                        <div class="section-2">
                          <h4 class="m-card-price">S/. {{ r.price }}</h4>
                          <a
                            class="m-card-link m-text-white"
                            @click="changeStatusRoom(r.number)"
                          >
                          <v-icon class="m-text-white"> mdi-comment-arrow-right </v-icon>
                            Cambiar estado
                          </a>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Loading: () => import("@/components/common/Loading"),
  },
  data() {
    return {
      loading: true,
      tab: null,
    };
  },
  computed: {
    ...mapState("reception", ["rooms"]),
    
    showCardIfDataExists() {
      return this.rooms.length
    }
  },
  async created() {
    await this.getAllReceptionRooms();
    this.loading = false
  },
  methods: {
    ...mapActions("reception", ["getAllReceptionRooms"]),

    changeStatusRoom(number) {
      localStorage.setItem("roomNumber", number);
      this.$router.push({ name: "rooms" });
    },
  },
};
</script>
<style scoped lang="scss">
.nose {
  font-weight: bold;
}
.m-card-container {
  height: 70px;
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
}
.m-text-white{
  color: #fff;
}
.m-text-black{
  color: #000;
}
.m-text-gris{
  color: #494747;
}
.section-1,
.section-2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.section-1{
  align-items: flex-start;
}
.section-2{
  align-items: flex-end;
}
.m-card-price{
  font-size: 14px;
}
.m-card-location {
  font-size: 10px;
}
.m-card-level {
  font-size: 13px;
}
.m-card-link {
  text-decoration: none;
  font-weight: bold;
  font-size: 13px;
  margin: 0;
  padding: 0;
}
</style>