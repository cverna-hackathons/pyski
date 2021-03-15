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
      <!-- <pre>{{ match }}</pre> -->
    </div>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import Vue from 'vue';
import { getMatch } from '../queries/getMatch';
import Game from '../components/Game.vue';

// interface GameFinishedData {
//   gameFinished: string;
// }

// interface GameFinishedResult {
//   data: GameFinishedData;
// }

interface MatchComponentData {
  delay?: ReturnType<typeof setTimeout>;
}
export default Vue.extend({
  data: (): MatchComponentData => ({ delay: undefined }),
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
    $subscribe: {
      gameFinished: {
        query: gql`
          subscription {
            gameFinished
          }
        `,
        result(/* _data: GameFinishedResult */) {
          if (this.delay) {
            clearTimeout(this.delay);
          }
          this.delay = setTimeout(() => {
            this.$apollo.queries.match.refetch();
          }, 400);
        },
      },
    },
  },
  components: {
    Game,
  },
});
</script>
