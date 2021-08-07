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
      <ProductFilter :page.sync='page' :color-id.sync='filterColor' :price-from.sync='filterPriceFrom' :price-to.sync='filterPriceTo' :category-id.sync='filterCategory'/>
      <section class='catalog'>
        <ProductList :products='products' :filterColor='filterColor'/>
        <div v-if='productLoading'>Загрузка товаров...</div>
        <div v-if='productLoadingFailed'>Произошла ошибка при загрузке товаров <button @click.prevent='loadProducts'>Попробовать еще</button></div>
        <BasePagination v-model='page' :count='countProducts' :per-page='productsPerPage' />
      </section>
    </div>
  </main>
</template>

<script>
import API_BASE_URL from '@/config';
import axios from 'axios';
import ProductList from '@/components/ProductList.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import BasePagination from '@/components/BasePagination.vue';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategory: 0,
      filterColor: 0,
      productsPerPage: 6,
      page: 1,
      productsData: null,
      categoriesData: 0,
      productLoading: false,
      productLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => {
          const item = { ...product, image: product.image.file.url };
          return item;
        })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategory() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
  methods: {
    loadProducts() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL.API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            categoryId: this.filterCategory,
            colorId: this.filterColor,
          },
        })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productLoadingFailed = true; })
          .then(() => { this.productLoading = false; });
      }, 0);
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
