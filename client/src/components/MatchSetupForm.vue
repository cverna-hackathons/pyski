<template>
  <div class="match-setup-container">
    <form @submit.prevent="handleSubmit">
      <p>
        <label>
          Grid width:
          <select name="grid_width" v-model="gridWidth">
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
          <select name="grid_height" v-model="gridHeight">
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
          <b>Number of games: {{ numOfGames }}</b>
          <RangeInput
            :max="50"
            :min="1"
            name="numOfGames"
            :step="1"
            v-model="numOfGames"
          />
        </label>
      </p>
      <p>
        <label>
          <b>Maximum rounds: {{ maxRounds }}</b>
          <RangeInput
            :max="500"
            :min="10"
            name="maxRounds"
            :step="10"
            v-model="maxRounds"
          />
        </label>
      </p>
      <p>
        <label>
          <b>Winning length: {{ winningLength }}</b>
          <RangeInput
            :max="10"
            :min="3"
            name="winningLength"
            :step="1"
            v-model="winningLength"
          />
        </label>
      </p>
      <p>
        <label>
          <b>Player A: {{ playerA }}</b>
          <select name="playerA" v-model="playerA">
            <option
              v-for="player in players"
              :key="`a-${player.id}`"
              :value="player.id"
            >
              {{ player.name }} [{{ player.type }}]
            </option>
          </select>
        </label>
      </p>
      <p>
        <label>
          <b>Player B: {{ playerB }}</b>
          <select name="playerB" v-model="playerB">
            <option
              v-for="player in players"
              :key="`b-${player.id}`"
              :value="player.id"
            >
              {{ player.name }} [{{ player.type }}]
            </option>
          </select>
        </label>
      </p>
      <button>Let's play</button>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import SizeOption from './SizeOption';
import RangeInput from './RangeInput.vue';
import { GRID_SIZES } from '../constants';
import { getPlayers } from '../queries/getPlayers';
import { mutate } from '../utils/graphql';
import { createMatch } from '../queries/createMatch';

interface CreateMatchResponse {
  createMatch: {
    id: string;
  };
}

type PlayerRecord = {
  id: string;
};

interface GetMatchResponse {
  data: {
    players: PlayerRecord[];
  };
}

interface MatchSetupComponentData {
  GRID_SIZES: number[];
  gridWidth: number;
  gridHeight: number;
  maxRounds: number;
  numOfGames: number;
  playerA?: string;
  playerB?: string;
  winningLength: number;
}

export default Vue.extend({
  data: (): MatchSetupComponentData => ({
    GRID_SIZES,
    gridWidth: GRID_SIZES[1],
    gridHeight: GRID_SIZES[1],
    maxRounds: 100,
    numOfGames: 3,
    playerA: undefined,
    playerB: undefined,
    winningLength: 5,
  }),
  apollo: {
    players: {
      query: getPlayers,
      result({ data: { players } }: GetMatchResponse) {
        this.playerA = players[0].id;
        this.playerB = players[0].id;
      },
    },
  },
  components: {
    RangeInput,
    SizeOption,
  },
  methods: {
    async handleSubmit() {
      const {
        createMatch: { id },
      } = await mutate<CreateMatchResponse>(createMatch, {
        input: {
          gridHeight: this.gridHeight,
          gridWidth: this.gridWidth,
          maxRounds: this.maxRounds,
          numOfGames: this.numOfGames,
          playerA: this.playerA,
          playerB: this.playerB,
          timeout: 20000,
          winningLength: this.winningLength,
        },
      });
      this.$router.push(`/match/${id}`);
    },
  },
});
</script>
<style>
.match-setup-container {
  padding: 1em;
}
</style>
