<template>
  <div>
    <h1>{{ greeting }}</h1>
    <p>What do you want to do today?</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export const WelcomeBoard = defineComponent({
  computed: {
    greeting() {
      return 'Hi pyskonator!'
    },
  },
})
export default WelcomeBoard
</script>
