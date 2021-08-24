<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.image" width="120" height="120" srcset="img/phone-square-3@2x.jpg 2x" alt="item.productOffer.title">
    </div>
    <h3 class="product__title">
      {{item.productOffer.title}}
    </h3>
    <p class="product__info" v-show="item.productOffer.product.mainProp.code === 'built_in_memory'">
      Объем: <span>{{item.productOffer.propValues[0].value}}</span>
    </p>
    <p class="product__info product__info--color" style='margin-top: 50px'>
      Цвет:
      <span>
        <i :style="{backgroundColor: item.color.color.code}"></i>
        {{item.color.color.title}}
      </span>
    </p>
    <span class="product__code">
      Артикул: {{item.id}}
    </span>
    <AmountBlock :productAmount.sync="productAmount" :size='size'/>
    <b class="product__price">
      {{(item.price * amount) | numberFormat}} ₽
    </b>
    <button class="product__del button-del pointer" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item.id)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import AmountBlock from '@/components/AmountBlock.vue';

export default {
  components: { AmountBlock },
  props: ['item', 'amount'],
  filters: {
    numberFormat,
  },
  data() {
    return {
      size: 10,
    };
  },
  computed: {
    productAmount: {
      get() {
        return this.amount;
      },
      set(value) {
        if (value > 0) {
          return this.$store.dispatch('updateCartProductAmount', { productId: this.item.id, amount: value });
        }
        return this.$store.dispatch('updateCartProductAmount', { productId: this.item.id, amount: 1 });
      },
    },
  },
  methods: {
    ...mapActions(['deleteCartProduct']),
    deleteProduct(id) {
      this.deleteCartProduct({ productId: id });
    },
  },
};
</script>
