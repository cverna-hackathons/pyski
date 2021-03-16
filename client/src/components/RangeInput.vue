<template>
  <div class="range-input">
    <span class="range-input-prepend">{{ min }}</span>
    <input
      type="range"
      :name="name"
      v-model="valueInput"
      :max="max"
      :min="min"
      :step="step"
    />
    <span class="range-input-append">{{ max }}</span>
    <br />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  computed: {
    valueInput: {
      get(): number | undefined {
        return this.value;
      },
      set(val: string) {
        this.$emit('input', parseInt(val));
      },
    },
  },
  props: {
    max: Number,
    min: Number,
    value: Number,
    name: String,
    step: Number,
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
