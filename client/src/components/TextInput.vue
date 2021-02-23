<template>
  <div class="text-input">
    <input type="text" :name="name" v-model="valueInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  computed: {
    valueInput: {
      get(): string | undefined {
        return this.modelValue
      },
      set(val: string) {
        this.$emit('update:modelValue', val)
      },
    },
  },
  props: {
    modelValue: String,
    name: String,
  },
})
</script>
<style>
.range-input span {
  position: relative;
  margin: auto 0.5em;
  top: -0.3em;
}
</style>
