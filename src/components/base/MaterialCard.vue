<template>
  <v-card
    v-bind="$attrs"
    :class="classes"
    class="v-card--material pa-3"
    style="position:relative"
  >
    <div class="d-flex grow flex-wrap">
      <v-avatar
        v-if="avatar"
        size="128"
        class="mx-auto v-card--material__avatar elevation-6"
        color="green"
      >
        <v-img :src="avatar" />
      </v-avatar>

      <v-sheet
        v-else
        :class="{
          'pa-7': !$slots.image
        }"
        :color="color"
        :max-height="icon ? 90 : undefined"
        :width="icon ? 'auto' : '100%'"
        elevation="6"
        class="text-start v-card--material__heading mb-n6"
        dark
      >
        <slot
          v-if="$slots.heading"
          name="heading"
        />

        <slot
          v-else-if="$slots.image"
          name="image"
        />

        <div
          v-else-if="title && !icon"
          class="headline text-uppercase"
          v-text="title"
        />

        <v-icon
          v-else-if="icon"
          size="32"
          v-text="icon"
        />

        <div
          v-if="text"
          class="display-1 font-weight-bold text-uppercase"
          v-text="text"
        />
      <slot
        slot="reveal-actions"
        name="reveal-actions"
      />
      </v-sheet>


      <div
        v-if="$slots['after-heading']"
        class="ml-6"
      >
        <slot name="after-heading" />
      </div>

      <div
        v-else-if="icon && title"
        class="ml-4"
      >
        <div
          class="card-title font-weight-black text-uppercase"
          v-text="title"
        />
      </div>
    </div>

    <slot />

    <template v-if="$slots.actions">
      <div style="position:absolute; bottom:10px">

      <v-divider class="mt-2" />

      <v-card-actions class="pb-0">
        <slot name="actions" />
      </v-card-actions>
      </div>
    </template>
  </v-card>
</template>

<script>
  export default {
    name: 'MaterialCard',

    props: {
      avatar: {
        type: String,
        default: '',
      },
      color: {
        type: String,
        default: 'white',
      },
      icon: {
        type: String,
        default: undefined,
      },
      image: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
    },

    computed: {
      classes () {
        return {
          'v-card--material--has-heading': this.hasHeading,
        }
      },
      hasHeading () {
        return Boolean(this.$slots.heading || this.title || this.icon)
      },
      hasAltHeading () {
        return Boolean(this.$slots.heading || (this.title && this.icon))
      },
    },
  }
</script>

<style lang="sass">
  .v-card--material
    &__avatar
      position: relative
      top: -64px
      margin-bottom: -32px

    &__heading
      max-height: 220px
      position: relative
      top: -40px
      transition: .3s ease
      z-index: 1
</style>
