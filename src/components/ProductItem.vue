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
      <li class='colors__item' v-for='color in colorsList' :key="`${color.id}_${product.id}`">
        <label class='colors__label'>
          <input name='color' class='colors__radio sr-only' type='radio' :value='color' v-model='selectedColor' >
          <span class='colors__value' :style="{backgroundColor: color.code}" :class="{border: color.code === '#fafafa', checkedItem: color.id === checked}">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      selectedColor: this.product.colors[0].id,
    };
  },
  props: ['product', 'filterColor'],
  filters: {
    numberFormat,
  },
  computed: {
    colorsList() {
      return this.product.colors;
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
