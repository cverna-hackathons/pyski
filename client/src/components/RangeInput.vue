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
import { defineComponent } from 'vue';
export default defineComponent({
  computed: {
    valueInput: {
      get(): number | undefined {
        return this.modelValue;
      },
      set(val: string) {
        this.$emit('update:modelValue', parseInt(val));
      },
    },
  },
  props: {
    max: Number,
    min: Number,
    modelValue: Number,
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
