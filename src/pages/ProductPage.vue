<template>
  <main class="content container" v-if='productLoading'><Preloader /></main>
  <main class="content container" v-else-if='!productData'>Не удалось загрузить товар</main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{category.title}}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{product.title}}
          </a>
        </li>
      </ul>
    </div>
    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper" style='position: relative'>
          <img width="570" height="570" :src="imgsList[currentImg]"  :alt="product.title">
          <transition name='fade'>
          <img class='abs_position' v-if='transition' width="570" height="570" :src="imgsList[currentImg]"  :alt="product.title">
          </transition>
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for='(img, index) in imgsList' :key='index'>
            <label>
              <input class='img_input' name='img' type='radio' v-model.number='currentImg' :value='index'/>
              <div class="pics__link cursor-pointer"  :class="{'pics__link--current': currentImg == index}">
                <img width="98" height="159" :src="img" :alt="product.title">
              </div>
            </label>
          </li>
        </ul>
      </div>
      <div class="item__info">
        <span class="item__code">Артикул: {{product.id}}</span>
        <h2 class="item__title">
          {{title}} ({{colorWord}})
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{price | numberFormat}} ₽
            </b>
            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class='colors__item' v-for='color in colorsList' :key='color.id'>
                  <label class='colors__label'>
                    <input name='color' class='colors__radio sr-only' type='radio' v-model.number='currentColorId' :value='color.color.id'>
                    <span class='colors__value' :style="{backgroundColor: color.color.code}" :class="{checkedItem: color.color.id === selectedColor}">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>
            <fieldset class="form__block" v-show='product.mainProp.id !== 7'>
              <legend class="form__legend">{{product.mainProp.title}}:</legend>
              <ul class="sizes sizes--primery">
                <li class="sizes__item"  v-for='prop in this.product.offers' :key='prop.propValues[0].value' >
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" v-model.number='currentPropId' :value='prop.id'>
                    <span class="sizes__value" :class="{checked_memory: prop.id === selectedProp}">
                      {{prop.propValues[0].value}}
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>
            <div class="item__row">
              <AmountBlock :productAmount.sync="productAmount" :size="size"/>
              <button class="button button--primery" type="submit" v-on:click='transition = !transition' :disabled='productAddSending'>
                В корзину
              </button>
            </div>
            <div v-show='productAdded'><br />Товар добавлен в корзину</div>
            <div v-show='productAddSending'>Добавление товара в корзину...</div>
          </form>
        </div>
      </div>
      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item" v-for='(tab, index) in tabsList' :key='index'>
          <label>
            <input class='img_input' name='tab' type='radio' v-model.number='currentTab' :value='index'/>
            <div class="tabs__link cursor-pointer" :class="{'tabs__link--current': currentTab == index}">
              {{tab}}
            </div>
          </label>
          </li>
        </ul>
        <div class="item__content" v-if='currentTab === 0'>
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>
          <button class='item__content--button' @click.prevent='changeTab'>
            Все характеристики
          </button>
          <h3>Что это?</h3>
          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>
          <h3>Дизайн</h3>
          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
        <div class="item__content" v-if='currentTab === 1'>
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
            аккумулятор: 3000 мА·ч<br/>
            процессор: Mediatek Helio P22 (MT6762V)<br/>
            SIM-карты: 2 (nano SIM)<br/>
            операционная система: Android 8.1<br/>
            беспроводные интерфейсы: Wi-Fi, Bluetooth 4.2<br/>
            интернет: 4G LTE<br/>
            вес: 145 г<br/>
          </p>
        </div>
        <div class="item__content" v-if='currentTab === 2'>
          <p>Срок гарантии: 1 год</p>
        </div>
        <div class="item__content" v-if='currentTab === 3'>
          <h3>Самовывоз</h3>
          <p>Бесплатно. Данную опцию Вы сможете выбрать при оформлении заказа.</p>
          <h3>Курьером</h3>
          <p>Цена доставки курьером составляет 500 рублей. Данную опцию Вы сможете выбрать при оформлении заказа. Доставка будет включена в стоимость.</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import API_BASE_URL from '@/config';
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';
import AmountBlock from '@/components/AmountBlock.vue';
import Preloader from '@/components/Preloader.vue';

export default {
  components: { AmountBlock, Preloader },
  data() {
    return {
      transition: false,
      currentColorId: 0,
      currentPropId: 0,
      productAmount: 1,
      size: 12,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
      currentImg: 0,
      currentTab: 0,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    price() {
      return this.productData.offers.find((el) => el.id === this.selectedProp).price;
    },
    title() {
      return this.productData.offers.find((el) => el.id === this.selectedProp).title.replace(/ *\([^)]*\) */g, '');
    },
    colorWord() {
      return this.colorsList.find((el) => el.color.id === this.selectedColor).color.title;
    },
    imgsList() {
      return [this.product.preview.file.url, 'http://placehold.it/98x159/'];
    },
    selectedColor() {
      if (this.$store.state.filterColor === 0) {
        if (this.currentColorId === 0) return this.product.colors[0].color.id;
        return this.currentColorId;
      }
      return this.$store.state.filterColor;
    },
    selectedProp() {
      if (this.currentPropId === 0) {
        return this.product.offers[0].id;
      }
      return this.currentPropId;
    },
    product() {
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
    tabsList() {
      return ['Описание', 'Характеристики', 'Гарантия', 'Оплата и доставка'];
    },
    colorsList() {
      return this.product.colors;
    },
    memoryArray() {
      return this.product.offers;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    goToPage,
    addToCart() {
      this.productAdded = false;
      if (this.productAmount >= 1) {
        this.addProductToCart({ productId: this.selectedProp, amount: this.productAmount, colorId: this.selectedColor })
          .then(() => {
            this.productAdded = true;
            this.productAddSending = false;
          });
      }
    },
    loadProduct() {
      const url = `${API_BASE_URL.API_BASE_URL}/api/products/${this.$route.params.id}`;
      axios.get(url)
        .then((response) => { this.productData = response.data; })
        .catch(() => { this.productLoadingFailed = true; })
        .then(() => { this.productLoading = false; });
    },
    changeTab() {
      this.currentTab = 1;
    },
  },
  created() {
    this.loadProduct();
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
    },
  },
};
</script>
