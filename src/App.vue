<template>
  <!-- eslint-disable max-len -->
  <main class='content container'>
    <div class='content__top content__top--catalog'>
      <h1 class='content__title'>
        Каталог
      </h1>
      <span class='content__info'>
        152 товара
      </span>
    </div>

    <div class='content__catalog'>
      <ProductFilter :color-id.sync='filterColor' :price-from.sync='filterPriceFrom' :price-to.sync='filterPriceTo' :category-id.sync='filterCategory'/>
      <section class='catalog'>
        <ProductList :products='products' />
        <BasePagination v-model='page' :count='countProducts' :per-page='productsPerPage' />
      </section>
    </div>
  </main>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import ProductFilter from './components/ProductFilter.vue';
import BasePagination from './components/BasePagination.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategory: 0,
      filterColor: 0,
      productsPerPage: 6,
      page: 1,
    };
  },
  computed: {
    filterProducts() {
      let filterProducts = products;
      if (this.filterPriceFrom > 0) {
        filterProducts = filterProducts.filter((product) => product.price > this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filterProducts = filterProducts.filter((product) => product.price < this.filterPriceTo);
      }
      if (this.filterCategory) {
        filterProducts = filterProducts.filter((product) => product.categoryID === this.filterCategory);
      }
      if (this.filterColor > 0) {
        filterProducts = filterProducts.filter((product) => product.colorId.some((color) => color === this.filterColor));
      }
      return filterProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filterProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filterProducts.length;
    },
  },
};
</script>
