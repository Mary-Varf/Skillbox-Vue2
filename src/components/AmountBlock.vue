<template>
  <div :class="{product__counter: size === 10}" class="form__counter">
    <button type="button" :class="{pointer: productAmount > 1, disabled: productAmount <= 1}" aria-label="Убрать один товар" @click="dec">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <input type="text" v-model="currentProductAmount"  @change='addItem' >
    <button :class="{pointer: productAmount >= 1}" type="button" aria-label="Добавить один товар" @click='inc'>
      <svg :width="size" :height="size" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['productAmount', 'size'],
  data() {
    return {
      currentProductAmount: this.productAmount,
    };
  },
  watch: {
    productAmount(value) {
      this.currentProductAmount = value;
    },
  },
  methods: {
    addItem() {
      const val = Math.abs(this.currentProductAmount.replace(/\D+/g, ''));
      this.$emit('update:productAmount', val); // eslint-disable-line
    },
    inc() {
      this.$emit('update:productAmount', this.currentProductAmount + 1);
    },
    dec() {
      if (this.currentProductAmount > 1) {
        this.$emit('update:productAmount', this.currentProductAmount - 1);
      }
    },
  },
};
</script>
