<template>
  <div class="container-input-money">
    <label
      class="input-money-label"
      for="price"
      style="/* left: 0px; */ /* right: auto; */ position: absolute"
      >* Precio</label
    >
    <money
      class="input-money"
      id="price"
      :v-model="value"
      v-bind="money"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>

<script>
import { Money } from "v-money";
export default {
  props: {
    value: {
      require: true,
    },
  },
  components: {
    Money,
  },
  data: () => ({
    money: {
      decimal: ".",
      thousands: ",",
      prefix: "S/. ",
      suffix: "",
      precision: 2,
      masked: false,
    },
  }),
  methods:{
      updateValue(value){
          this.$emit("input", value)
      }
  }
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

.input-money {
  padding: 9px 12px;
  border: 1px solid #9e9e9e;
  border-radius: 5px;
  width: 100%;
}
.input-money:focus {
  border: 2px solid #4caf50;
  outline: none;
  .input-money-label {
    color: #4caf50 !important;
  }
}
</style>