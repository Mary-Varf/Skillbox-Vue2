<template>
  <!-- eslint-disable max-len -->
  <li class="catalog__item">
    <a class="catalog__pic" href="#" @click.prevent="goToPage('product', {id: product.id})">
      <img :src='product.image' alt="product.title" />
    </a>
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
          <input name='color' class='colors__radio sr-only' type='radio' :value='color' v-model='selectedColor'>{{color === selectedColor}}
          <span class='colors__value' :style="{backgroundColor: colors[color - 1].title}" :class="{border: colors[color - 1].title === '#fff'}">
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
  props: ['product'],
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
  },
  methods: {
    goToPage,
  },
};
</script>
