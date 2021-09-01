<template>
  <!-- eslint-disable max-len -->
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src='product.image' :alt="product.title" />
    </router-link>
    <transition name='moveToCart'>
    <img :src='product.image' :alt="product.title" class='abs_position catalog__pic' v-if='productAdded'/>
    </transition>
    <div class='icon__block'  :class="{'added': productAdded}">
    <img class='cart__icon' alt='cart' src='img/cart.png' @click.prevent='addToCart' />
    </div>
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
          <span class='colors__value' :style="{backgroundColor: color.color.code}" :class="{border: color.color.code === '#fafafa', checkedItem: color.color.id === checked}">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      selectedColor: this.product.colors[0].color.id,
      productAdded: false,
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
    ...mapActions(['addProductToCart', 'loadCart']),
    addToCart() {
      this.productAdded = false;
      const color = typeof this.selectedColor === 'object' ? this.selectedColor.color.id : this.selectedColor;
      this.addProductToCart({ productId: this.product.offers[0].id, amount: 1, colorId: color })
        .then(() => {
          this.productAdded = true;
        })
        .catch(() => {
          this.productAdded = false;
          this.addProductToCart({ productId: this.product.offers[0].id, amount: 1, colorId: color })
            .then(() => {
              this.productAdded = true;
            })
            .catch(() => {
              this.productAdded = false;
            });
        });
    },
  },
};
</script>
