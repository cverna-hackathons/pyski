<template>
  <div>
    <form @submit.prevent="handleMatchSubmittal">
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
import { mapActions } from 'vuex'
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
  methods: {
    ...mapActions(['submit']),
    async handleMatchSubmittal() {
      const response = await this.submit({
        grid_height: this.gridHeightInput,
        grid_width: this.gridWidthInput,
        num_of_games: 1,
        max_rounds: 500,
        repo_A: 'server/lib/players/alpha.js',
        repo_B: 'server/lib/players/alpha.js',
        winning_length: 5,
      })
      console.log('response', response)
    },
  },
})
</script>
