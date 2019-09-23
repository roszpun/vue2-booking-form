<template>
  <h2 class="price">{{price}}{{unit}}</h2>
</template>

<script>
export default {
  name: "Price",
  props: {
    price: {
      type: Number,
      default: 0,
      required: true
    },
    unit: {
      type: String,
      default: "zł"
    }
  },
};
</script>
