<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" srcset="img/phone-square-3@2x.jpg 2x" alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{item.product.title}}
    </h3>
    <p class="product__info">
      Объем: <span>128GB</span>
    </p>
    <span class="product__code">
      Артикул: {{item.product.id}}
    </span>
    <AmountBlock :productAmount.sync="productAmount" :size='size'/>
    <b class="product__price">
      {{(item.product.price * item.amount) | numberFormat}} ₽
    </b>
    <button class="product__del button-del pointer" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item.productId)">
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
  props: ['item'],
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
        return this.item.amount;
      },
      set(value) {
        if (value > 0) {
          return this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
        }
        return this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: 1 });
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
