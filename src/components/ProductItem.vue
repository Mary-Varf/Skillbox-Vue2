<template>
  <!-- eslint-disable max-len -->
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src='product.image' alt="product.title" />
    </a>
    <h3 class="catalog__title">
      <a href="#">
        {{product.title}}
      </a>
    </h3>
    <span class="catalog__price">
      {{product.price}} ₽
    </span>
    <ul class="colors colors--black">
      <li class='colors__item' v-for='color in colorsList' :key="`${color}_${product.id}`">{{color}}
        <label class='colors__label'>
          <input name='color' class='colors__radio sr-only' type='radio' value='color' :id='color'>
          <span class='colors__value' :style="{backgroundColor: colors[color - 1].title}" :class="{border: colors[color - 1].title === '#fff'}">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import colors from '../data/colors';

export default {

  props: ['product'],
  computed: {
    colors() {
      return colors;
    },
    colorsList() {
      return this.product.colorId;
    },

  },
};
</script>
