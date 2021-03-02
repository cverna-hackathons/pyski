<template>
  <div class="match-setup-container">
    <form @submit.prevent="submitMatch">
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
          <select name="playerA" v-model="playerAInput">
            <option
              v-for="player in players"
              :key="player.path"
              :value="player.path"
            >
              {{ player.title }}
            </option>
          </select>
        </label>
      </p>
      <p>
        <label>
          <b>Player B: {{ playerBInput }}</b>
          <select name="playerB" v-model="playerBInput">
            <option
              v-for="player in players"
              :key="player.path"
              :value="player.path"
            >
              {{ player.title }}
            </option>
          </select>
        </label>
      </p>
      <button>Let's play</button>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapMutations, mapState } from 'vuex';
import SizeOption from './SizeOption';
import RangeInput from './RangeInput.vue';
import { GRID_SIZES } from '../constants';

export default defineComponent({
  data() {
    return {
      GRID_SIZES,
    };
  },
  components: {
    RangeInput,
    SizeOption,
  },
  mounted() {
    this.loadPlayers();
  },
  computed: {
    ...mapState('match', [
      'gridWidth',
      'gridHeight',
      'maxRounds',
      'numOfGames',
      'playerA',
      'playerB',
      'winningLength',
      'players',
    ]),
    gridWidthInput: {
      get(): number {
        return this.gridWidth;
      },
      set(value: number) {
        this.setGridWidth(value);
      },
    },
    gridHeightInput: {
      get(): number {
        return this.gridHeight;
      },
      set(value: number) {
        this.setGridHeight(value);
      },
    },
    maxRoundsInput: {
      get(): number {
        return this.maxRounds;
      },
      set(value: number) {
        this.setMaxRounds(value);
      },
    },
    numOfGamesInput: {
      get(): number {
        return this.numOfGames;
      },
      set(value: number) {
        this.setNumOfGames(value);
      },
    },
    playerAInput: {
      get(): string {
        return this.playerA;
      },
      set(value: string) {
        this.setPlayerA(value);
      },
    },
    playerBInput: {
      get(): string {
        return this.playerB;
      },
      set(value: string) {
        this.setPlayerB(value);
      },
    },
    winningLengthInput: {
      get(): number {
        return this.winningLength;
      },
      set(value: number) {
        this.setWinningLength(value);
      },
    },
  },
  methods: {
    ...mapActions('match', ['submitMatch', 'loadPlayers']),
    ...mapMutations('match', [
      'setGridWidth',
      'setGridHeight',
      'setMaxRounds',
      'setNumOfGames',
      'setPlayerA',
      'setPlayerB',
      'setWinningLength',
    ]),
  },
});
</script>
<style>
.match-setup-container {
  padding: 1em;
}
</style>
