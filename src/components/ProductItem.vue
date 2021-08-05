<template>
  <!-- eslint-disable max-len -->
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src='product.image' alt="product.title" />
    </router-link>
    <h3 class="catalog__title">
      <a href="#">
        {{product.title}}
      </a>
    </h3>
    <span class="catalog__price">
      {{product.price | numberFormat}} ₽
    </span>
    <ul class="colors colors--black">
      <li class='colors__item' v-for='color in colorsList' :key="`${color}_${product.id}`">
        <label class='colors__label'>
          <input name='color' class='colors__radio sr-only' type='radio' :value='color' v-model='selectedColor' :class="{}">
          <span class='colors__value' :style="{backgroundColor: colors[color - 1].title}" :class="{border: colors[color - 1].title === '#fff', checkedItem: color === checked}">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';
import colors from '../data/colors';

export default {
  data() {
    return {
      selectedColor: this.product.colorId[0],
    };
  },
  props: ['product', 'filterColor'],
  filters: {
    numberFormat,
  },
  computed: {
    colors() {
      return colors;
    },
    colorsList() {
      return this.product.colorId;
    },
    checked() {
      if (this.filterColor === 0) {
        return this.selectedColor;
      }
      return this.filterColor;
    },
  },
  methods: {
    goToPage,
  },
};
</script>
