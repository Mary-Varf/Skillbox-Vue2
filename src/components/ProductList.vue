<template>
<!-- eslint-disable max-len -->
  <ul class="catalog__list">
    <ProductItem v-for='product in products' :key='product.id' :filterColor='filterColor' :product='product' />
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products', 'filterColor'],
};
</script>
