<template>
  <div class="text-input">
    <input type="text" :name="name" v-model="valueInput" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  computed: {
    valueInput: {
      get(): string | undefined {
        return this.value;
      },
      set(val: string) {
        this.$emit('input', val);
      },
    },
  },
  props: {
    value: String,
    name: String,
  },
});
</script>
<style>
.range-input span {
  position: relative;
  margin: auto 0.5em;
  top: -0.3em;
}
</style>
