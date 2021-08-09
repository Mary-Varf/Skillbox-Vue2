<template>
  <div>
    <ul class="cart__orders">
      <OrderProduct :product='product' v-for='product in products' :key='product.id' />
    </ul>
    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: {{ totalNW }} на сумму <b>{{ totalPrice | numberFormat}} ₽</b></p>
    </div>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import quantityNumberAndWord from '@/helpers/quantityWordAndNumbe';
import OrderProduct from '@/components/OrderProduct.vue';

export default {
  props: ['products'],
  components: { OrderProduct },
  computed: {
    totalPrice() {
      return this.products.reduce((acc, item) => (item.price * item.quantity) + acc, 0);
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
