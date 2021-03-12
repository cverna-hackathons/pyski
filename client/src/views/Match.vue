<template>
  <div>
    <h1>Match [#{{ matchId }}]</h1>
    <div v-if="$apollo.queries.match.loading">Loading match...</div>
    <div v-else>
      <div>
        <Game
          v-for="game of match.games"
          :game="game"
          :gameId="game.id"
          :numOfGames="match.numOfGames"
          :key="game.id"
        />
      </div>
      <pre>{{ match }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getMatch } from '../queries/getMatch';
import Game from './Game.vue';

export default Vue.extend({
  computed: {
    matchId(): string {
      return this.$route.params.matchId;
    },
  },
  apollo: {
    match: {
      query: getMatch,
      variables() {
        return {
          id: this.$route.params.matchId,
        };
      },
    },
  },
  components: {
    Game,
  },
});
</script>
