<template>
  <div>
    <ul class="cart__orders">
        <li class="cart__order" v-for='product in products' :key='product.id'>
          <h3>{{ product.productOffer.title }}</h3>
          <b>{{ product.price | numberFormat }} ₽</b>
          <b>{{ product.quantity }} шт.</b>
          <span>Артикул: {{ product.id }}</span>
        </li>
    </ul>
    <div class="cart__total">
      <p>Доставка: <b>{{delivery}} ₽</b></p>
      <p>Итого: {{ totalNW }} на сумму <b>{{ totalPrice | numberFormat}} ₽</b></p>
    </div>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import quantityNumberAndWord from '@/helpers/quantityWordAndNumbe';

export default {
  props: {
    products: {
      default: [],
    },
    delivery: {
      default: 0,
    },
  },
  computed: {
    totalPrice() {
      return Number(this.products.reduce((acc, item) => (item.price * item.quantity) + acc, 0)) + Number(this.delivery);
    },
    totalNW() {
      const number = this.products.reduce((acc, item) => (item.quantity) + acc, 0);
      return quantityNumberAndWord(number);
    },
  },
  filters: {
    numberFormat,
  },
};
</script>
