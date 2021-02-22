<template>
  <div>
    <form action="/match" method="post">
      <p>
        <label>
          Grid width:
          <select name="grid_width" v-model="gridWidthInput">
            <SizeOption
              v-for="size in GRID_SIZES"
              :size="size"
              :key="`gw-${size}`"
            />
          </select>
        </label>
      </p>
      <p>
        <label>
          Grid height:
          <select name="grid_height" v-model="gridHeightInput">
            <SizeOption
              v-for="size in GRID_SIZES"
              :size="size"
              :key="`gh-${size}`"
            />
          </select>
        </label>
      </p>
      <button>Let's play</button>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SizeOption from './SizeOption'

const GRID_SIZES: number[] = [10, 30, 50, 100]
export default defineComponent({
  data() {
    return {
      GRID_SIZES,
      gridWidthInput: GRID_SIZES[0],
      gridHeightInput: GRID_SIZES[0],
    }
  },
  components: {
    SizeOption,
  },
})
</script>
