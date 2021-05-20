<template>
  <img
    class="image"
    :src="image"
    :alt="alt"
  >
</template>

<script>
  export default {
    props: {
      image: {
        required: true,
        type: String,
      },
      alt: {
        default: 'image',
        type: String,
      },
    },
  }
</script>

<style>
  .image {
    border:1px solid #b1a8a8;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
