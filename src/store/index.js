import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartError: false,
    orderInfo: null,
    delivery: 0,
  },
  mutations: {
    updateDelivery(state, delivery) {
      state.delivery = delivery;
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((el) => productId === el.productId);
      if (item) {
        item.amount = amount;
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    updateCartError(state, data) {
      state.cartError = data;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        const el = { productId: item.product.id, amount: item.quantity };
        return el;
      });
    },
  },
  getters: {
    cartDetailProducts(state) {
      if (state.cartError) {
        return 'error';
      }
      return state.cartProducts.map((item) => {
        let prod = state.cartProductsData.find((p) => p.product.id === item.productId);
        prod = prod.product;
        const a = { ...item, product: { ...prod, image: prod.image.file.url } };
        return a;
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    totalNumber(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.amount) + acc, 0);
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios.get(`${API_BASE_URL.API_BASE_URL}/api/orders/${orderId}`, {
        params: { userAccessKey: context.state.userAccessKey },
      })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        });
    },
    loadCart(context) {
      return axios.get(`${API_BASE_URL.API_BASE_URL}/api/baskets`, {
        params: { userAccessKey: context.state.userAccessKey },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .catch(() => {
          context.commit('updateCartProductsData', []);
          context.commit('updateCartError', true);
        });
    },
    addProductToCart(context, { productId, amount }) {
      return axios.post(`${API_BASE_URL.API_BASE_URL}/api/baskets/products`, {
        productId: productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });
      if (amount < 1) {
        return 0;
      }
      return axios.put(`${API_BASE_URL.API_BASE_URL}/api/baskets/products`, {
        productId: productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteCartProduct(context, { productId }) {
      return axios.delete(`${API_BASE_URL.API_BASE_URL}/api/baskets/products`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
        data: {
          productId: productId,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
  },
});
