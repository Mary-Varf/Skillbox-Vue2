<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
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
      <form class="cart__form form" action="#" method="POST" @submit.prevent='order'>
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title='ФИО' :error='formError.name' placeholder='Введите ваше полное имя'  v-model="formData.name"/>
            <BaseFormText title='Адрес доставки' :error='formError.name' placeholder='Введите ваш адрес'  v-model="formData.address"/>
            <BaseFormText title='Телефон' :error='formError.phone' placeholder='Введите ваш телефон'  v-model="formData.phone"/>
            <BaseFormText title='Email' :error='formError.email' placeholder='Введи ваш Email'  v-model="formData.email"/>
            <BaseFormTextArea title='Комментарий к заказу' :error='formError.comment' placeholder='Ваши пожелания'  v-model="formData.comment"/>
        </div>
        <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" v-model='formData.deliveryTypeId' value='1' :error='formError.deliveryTypeId'>
                  <span class="options__value"  :class="{checkedOption: !formData.deliveryTypeId}">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" v-model='formData.deliveryTypeId' value="2">
                  <span class="options__value" >
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="payment" v-model='formData.paymentTypeId' value="1" :class="{checkedOption: !formData.paymentTypeId}">
                  <span class="options__value" >
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"  name="payment" v-model='formData.paymentTypeId' value="2">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart__block">
          <OrderProductList  :products="products" :delivery='deliveryPrice'/>
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import API_BASE_URL from '@/config';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextArea from '@/components/BaseFormTextArea.vue';
import OrderProductList from '@/components/OrderProductList.vue';
import quantityNumberAndWord from '@/helpers/quantityWordAndNumbe';

export default {
  components: { BaseFormText, BaseFormTextArea, OrderProductList },

  data() {
    return {
      formData: { deliveryTypeId: 1, paymentTypeId: 1 },
      formError: {},
      formErrorMessage: '',
    };
  },
  computed: {
    ...mapState({ products: 'cartProductsData' }),
    totalNW() {
      const number = this.products.reduce((acc, item) => (item.quantity) + acc, 0);
      return quantityNumberAndWord(number);
    },
    deliveryPrice() {
      console.log(!this.formData.deliveryTypeId);
      if (!this.formData.deliveryTypeId || this.formData.deliveryTypeId === '1' || this.formData.deliveryTypeId === 1) {
        return 0;
      }
      return 500;
    },
  },
  methods: {
    order() {
      this.formError = [];
      this.formErrorMessage = '';
      axios.post(`${API_BASE_URL.API_BASE_URL}/api/orders`, {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = (error.response.data.error.message.length > 0 ? error.response.data.error.message : 'Возникла ошибка, возможно, заполненные не все поля.');
        });
    },
  },
};
</script>
