<template>
  <div class="match-setup-container">
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
      <p>
        <label>
          <b>Number of games: {{ numOfGamesInput }}</b>
          <RangeInput
            :max="50"
            :min="1"
            name="numOfGames"
            :step="1"
            v-model="numOfGamesInput"
          />
        </label>
      </p>
      <p>
        <label>
          <b>Maximum rounds: {{ maxRoundsInput }}</b>
          <RangeInput
            :max="500"
            :min="10"
            name="maxRounds"
            :step="10"
            v-model="maxRoundsInput"
          />
        </label>
      </p>
      <p>
        <label>
          <b>Winning length: {{ winningLengthInput }}</b>
          <RangeInput
            :max="10"
            :min="3"
            name="winningLength"
            :step="1"
            v-model="winningLengthInput"
          />
        </label>
      </p>
      <p>
        <label>
          <b>Player A: {{ playerAInput }}</b>
          <TextInput name="playerA" v-model="playerAInput" />
        </label>
      </p>
      <p>
        <label>
          <b>Player B: {{ playerBInput }}</b>
          <TextInput name="playerB" v-model="playerBInput" />
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
import RangeInput from './RangeInput.vue'
import TextInput from './TextInput.vue'

const GRID_SIZES: number[] = [10, 30, 50, 100]
export default defineComponent({
  data() {
    return {
      GRID_SIZES,
      gridWidthInput: GRID_SIZES[0],
      gridHeightInput: GRID_SIZES[0],
      maxRoundsInput: 100,
      numOfGamesInput: 1,
      playerAInput: '',
      playerBInput: '',
      winningLengthInput: 5,
    }
  },
  components: {
    RangeInput,
    SizeOption,
    TextInput,
  },
  methods: {
    ...mapActions(['submit']),
    async handleMatchSubmittal() {
      const response = await this.submit({
        grid_height: this.gridHeightInput,
        grid_width: this.gridWidthInput,
        num_of_games: this.numOfGamesInput,
        max_rounds: this.maxRoundsInput,
        repo_A: this.playerAInput,
        repo_B: 'server/lib/players/alpha.js',
        winning_length: this.winningLengthInput,
      })
      console.log('response', response)
    },
  },
})
</script>
<style>
.match-setup-container {
  padding: 1em;
}
</style>
