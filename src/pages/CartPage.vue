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
        {{ numberOfProducts }}
      </span>
    </div>
    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key='item.product.id' :item='item'/>
          </ul>
        </div>
        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat}} ₽</span>
          </p>
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
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
    numberOfProducts() {
      const num = this.totalLeng;
      let str = 'товар';
      const secNum = num[num.length - 1];
      if ((num >= 2 && num <= 4) || (num > 20 && secNum >= 2 && secNum <= 4)) {
        str = 'товара';
      } else if ((num >= 5 && num <= 20) || (num > 20 && secNum >= 5) || (num % 10 === 0 && num !== 20)) {
        str = 'товаров';
      }
      return `${num} ${str}`;
    },
  },
};
</script>
