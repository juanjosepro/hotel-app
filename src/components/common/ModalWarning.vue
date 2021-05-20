<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="dialogWarning"
        persistent
        max-width="500"
      >
        <v-card>
          <v-card-title class="text-uppercase font-weight-black text-left">
            System message
          </v-card-title>
          <v-card-text>
            {{ text }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              color="success"
              class="font-weight-black"
              @click="openDialogWarning(false)"
            >
              Cancelar
            </v-btn>
            <v-btn
              text
              class="font-weight-black"
              @click="toAccept()"
            >
              {{ textBtn }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { EventBus } from '@/Event.js'

  export default {
    props: {
      text: {
        required: true,
        type: String,
      },
      textBtn: {
        required: true,
        type: String,
      },
    },
    computed: {
      ...mapState('dialog', ['dialogWarning']),
    },
    methods: {
      ...mapActions('dialog', ['openDialogWarning']),
      toAccept () {
        EventBus.$emit('the-user-confirm-the-warning-modal')
      },
    },
  }
</script>

<style></style>
