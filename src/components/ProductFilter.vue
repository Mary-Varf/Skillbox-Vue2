<template>
      <aside class='filter'>
        <h2 class='filter__title'>Фильтры</h2>

        <form class='filter__form form' action='#' method='get' @submit.prevent='submit'>
          <fieldset class='form__block'>
            <legend class='form__legend'>Цена</legend>
            <label class='form__label form__label--price'>
              <input class='form__input' type='text' name='min-price' v-model.number='currentPriceFrom'>
              <span class='form__value'>От</span>
            </label>
            <label class='form__label form__label--price'>
              <input class='form__input' type='text' name='max-price' v-model.number='currentPriceTo'>
              <span class='form__value'>До</span>
            </label>
          </fieldset>

          <fieldset class='form__block'>
            <legend class='form__legend'>Категория</legend>
            <label class='form__label form__label--select'>
              <select class='form__select' type='text' name='category' v-model.number='currentCategoryId'>
                <option value='0'>Все категории</option>
                <option :value='category.id' v-for='category in categories' :key='category.id'>{{category.title}}</option>
              </select>
            </label>
          </fieldset>

          <fieldset class='form__block'>
            <legend class='form__legend'>Цвет</legend>
            <ul class='colors'>
              <li class='colors__item' v-for='color in colors' :key='color.id'>
                <label class='colors__label'>
                  <input name='color' class='colors__radio sr-only' type='radio' v-model.number='currentColorId' :value='color.id' >
                  <span class='colors__value' :style="{backgroundColor: color.code}">
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <fieldset class='form__block'>
            <legend class='form__legend'>Объемб в ГБ</legend>
            <ul class='check-list'>
              <li class='check-list__item' v-for='(memory, index) in memoryArray' :key='index'>
                <label class='check-list__label'>
                  <input class='check-list__check sr-only' type='checkbox' name='memory' :value='memory' v-model='currentMemory'>
                  <span class='check-list__desc'>
                    {{memory}}
                    <span>  ({{number[memory]}})</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <button class='filter__submit button button--primery' type='submit' >Применить
          </button>
          <button class='filter__reset button button--second' type='button' @click.prevent='reset'>
            Сбросить
          </button>
        </form>
      </aside>
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorId', 'page', 'colorTitle', 'memory'],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,
      currentColorTitle: '',
      memoryArray: [8, 16, 32, 64, 128, 264],
      currentMemory: [8, 16, 32, 64, 128, 264],
      startPage: 1,
      categoriesData: null,
      colorsData: null,
      number: {},
    };
  },
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    memory(value) {
      this.currentMemory = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColorTitle = this.colors.find((color) => color.id === value).title;
      this.currentColorId = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColorId);
      this.$emit('update:memory', this.currentMemory);
      this.$emit('update:colorTitle', this.colors.find((color) => color.id === this.currentColorId).color.title);
      this.$emit('update:page', this.startPage);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorId', 0);
      this.$emit('update:memory', [8, 16, 32, 64, 128, 264]);
      this.$emit('update:colorTitle', '');
      this.$emit('update:page', 1);
    },
    loadItemsNumber() {
      this.memoryArray.forEach((val) => {
        axios.get(`${API_BASE_URL.API_BASE_URL}/api/products?props[built_in_memory][]=${val}GB`)
          .then((response) => {
            this.number[val] = response.data.items.length;
          });
      });
    },
    loadCategories() {
      clearTimeout(this.loadCaregoriesTimer);
      this.loadCaregoriesTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL.API_BASE_URL}/api/productCategories`)
          .then((response) => {
            this.categoriesData = response.data;
          });
      }, 0);
    },
    loadColors() {
      clearTimeout(this.loadColorsTimer);
      this.loadColorsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL.API_BASE_URL}/api/colors`)
          .then((response) => { this.colorsData = response.data; });
      }, 0);
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
    this.loadItemsNumber();
  },
};
</script>
