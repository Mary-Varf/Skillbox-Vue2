<template>
  <!-- eslint-disable max-len -->
  <main class='content container'>
    <div class='content__top content__top--catalog'>
      <h1 class='content__title'>
        Каталог
      </h1>
      <span class='content__info'>
        {{totalNW}}
      </span>
    </div>

    <div class='content__catalog'>
      <ProductFilter :memory.sync='filterMemory' :page.sync='page' :color-id.sync='filterColor' :price-from.sync='filterPriceFrom' :price-to.sync='filterPriceTo' :category-id.sync='filterCategory' :color-title.sync='filterColorTitle'/>
      <section class='catalog'>
        <h1 v-if='empty'>К сожалению, таких товаров нет.</h1>
        <ProductList :products='products' :filterColor='filterColor'/>
        <Preloader v-if='productLoading' />
        <div v-if='productLoadingFailed'>Произошла ошибка при загрузке товаров <button @click.prevent='loadProducts'>Попробовать еще</button></div>
        <BasePagination v-model='page' :count='countProducts' :per-page='productsPerPage' />
        <fieldset class='form__block' style='display:flex;justify-content:center;margin-top:40px'>
        <p style='margin-right:20px'>Количество товаров на странице</p>
          <label class='form__label form__label--select' style='width:140px'>
            <select class='form__select' type='text' style='border:1px solid #000;width:150px' name='productsPerPage' v-model.number='productsPerPage'>
              <option value='0'>Выбрать</option>
              <option :value='number' v-for='number in productsPerPageArray' :key='number'>{{number}}</option>
            </select>
          </label>
        </fieldset>
      </section>
    </div>
  </main>
</template>

<script>
import API_BASE_URL from '@/config';
import axios from 'axios';
import ProductList from '@/components/ProductList.vue';
import Preloader from '@/components/Preloader.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import BasePagination from '@/components/BasePagination.vue';
import quantityNumberAndWord from '@/helpers/quantityWordAndNumbe';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    Preloader,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategory: 0,
      filterColor: 0,
      filterMemory: [],
      filterColorTitle: '',
      productsPerPageArray: [9, 12, 18, 24, 27, 32],
      productsPerPage: 12,
      page: 1,
      productsData: null,
      categoriesData: 0,
      productLoading: false,
      productLoadingFailed: false,
      empty: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => {
          const item = { ...product, image: product.preview.file.url };
          return item;
        })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    totalNW() {
      const number = this.productsData ? this.productsData.pagination.total : 0;
      return quantityNumberAndWord(number);
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
    productsPerPage() {
      this.loadProducts();
    },
    filterMemory() {
      this.loadProducts();
    },
  },
  methods: {
    loadProducts() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        let colorUrl = '';
        if (this.filterColorTitle.length !== 0) {
          console.log();
          colorUrl = `?props[color][]=${this.filterColorTitle}`;
        }
        let memoryUrl = '';
        if (this.filterMemory.length !== 0 && this.filterMemory.length !== 6) {
          const obj = { ...this.filterMemory };
          const memoryArr = Object.values(obj);
          memoryUrl = (colorUrl === '' ? '?props' : '&props');
          memoryArr.forEach((el) => {
            memoryUrl += `[built_in_memory][]=${el}GB&`;
          });
        }
        console.log(memoryUrl);
        this.empty = false;
        axios.get(`${API_BASE_URL.API_BASE_URL}/api/products${colorUrl}${memoryUrl.slice(0, -1)}`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            minPrice: (this.filterPriceFrom === 0 || this.filterPriceFrom === '0' || this.filterPriceFrom === '') ? null : this.filterPriceFrom,
            maxPrice: (this.filterPriceTo === 0 || this.filterPriceTo === '0' || this.filterPriceTo === '') ? null : this.filterPriceTo,
            categoryId: (this.filterCategory === 0 || this.filterCategory === '0' || this.filterCategory === '') ? null : this.filterCategory,
          },
        })
          .then((response) => {
            this.productsData = response.data;
            this.empty = response.data.pagination.total === 0;
          })
          .catch(() => { this.productLoadingFailed = true; })
          .then(() => { this.productLoading = false; });
      }, 200);
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
