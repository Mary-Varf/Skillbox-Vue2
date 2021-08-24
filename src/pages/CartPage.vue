<template>
  <main v-if="products === 'error'" class="content container">
    <h2>Возникла ошибка</h2>
  </main>
  <main v-else-if='products.length < 1' class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>
      <h1 class="content__title">
        Корзина
      </h1>
    </div>
    <h2>Корзина пуста</h2>
  </main>
  <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>
      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalNW }}
      </span>
    </div>
    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key='item.product.id' :item='item.product' :amount='item.amount'/>
          </ul>
        </div>
        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat}} ₽</span>
          </p>
          <router-link tag="button" :to="{name: 'order'}" class="cart__button button button--primery" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import quantityNumberAndWord from '@/helpers/quantityWordAndNumbe';
import CartItem from '@/components/CartItem.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { CartItem },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', totalLeng: 'totalNumber' }),
    ...mapActions(['loadCart']),
    totalNW() {
      console.log(this.products);
      const number = this.products.reduce((acc, item) => (item.amount) + acc, 0);
      return quantityNumberAndWord(number);
    },
  },
};
</script>
