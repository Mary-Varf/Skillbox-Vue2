<template>
  <!-- eslint-disable max-len -->
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src='product.image' :alt="product.title" />
    </router-link>
    <transition name='moveToCart'>
      <img :src='product.image' :alt="product.title" class='abs_position catalog__pic' v-if='productAdded'/>
    </transition>
    <h3 class="catalog__title">
      <a href="#">
        {{product.title}}
      </a>
    </h3>
    <span class="catalog__price">
      {{price | numberFormat}} ₽
    </span>
    <div style='display: flex; justify-content: space-between; margin-right: 20px'>
    <ul class="colors colors--black" v-if="product.mainProp.code === 'color'">
      <li class='colors__item' v-for='color in colorsList' :key="`${color.id}_${product.id}`">
        <label class='colors__label'>
          <input name='color' class='colors__radio sr-only' type='radio' :value='color' v-model='selectedColor' >
          <span class='colors__value' :style="{backgroundColor: color.color.code}" :class="{border: color.color.code === '#fafafa', checkedItem: color.color.id === checked}">
          </span>
        </label>
      </li>
    </ul>
    <ul class="colors colors--black sizes" v-if="product.mainProp.code !== 'color' && product.mainProp.code !== 'battery_power' && product.mainProp.code !== 'construction_type'">
      <li class="sizes__item" v-for='prop in this.product.offers' :key='prop.propValues[0].value' >
        <label class="sizes__label">
          <input class="sizes__radio sr-only" type="radio" name="sizes-item" v-model.number='currentPropId' :value='prop.id'>
          <span class="sizes__value" :class="{checked_prop: prop.id === selectedProp}">
            {{prop.propValues[0].value}}
          </span>
        </label>
      </li>
    </ul>
    <div v-else></div>
    <div class='icon__block'  :class="{'added': productAdded}">
      <img class='cart__icon' alt='cart' src='img/cart.png' @click.prevent='addToCart' />
    </div>
    </div>
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
      currentPropId: 0,
    };
  },
  props: ['product', 'filterColor'],
  filters: {
    numberFormat,
  },
  computed: {
    price() {
      return this.currentPropId === 0 ? this.product.offers[0].price : this.product.offers.find((el) => el.id === this.currentPropId).price;
    },
    selectedProp() {
      if (this.currentPropId === 0) {
        return this.product.offers[0].id;
      }
      return this.currentPropId;
    },
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
