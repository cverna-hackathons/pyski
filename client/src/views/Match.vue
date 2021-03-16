<template>
  <div>
    <h1>Match [#{{ matchId }}]</h1>
    <div class="notification" v-if="$apollo.queries.match.loading">
      Loading match...
    </div>
    <div v-if="match">
      <h2>Options</h2>
      <div>
        <ul>
          <li>Winning length: {{ match.winningLength }}</li>
          <li>
            Player A [{{ match.playerA.name }}]:
            <strong>{{ PLAYER_MAP[1] }}</strong>
          </li>
          <li>
            Player B [{{ match.playerB.name }}]:
            <strong>{{ PLAYER_MAP[2] }}</strong>
          </li>
        </ul>
      </div>
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
import { PLAYER_MAP } from '../constants';

// interface GameFinishedData {
//   gameFinished: string;
// }

// interface GameFinishedResult {
//   data: GameFinishedData;
// }

interface MatchComponentData {
  delay?: ReturnType<typeof setTimeout>;
  PLAYER_MAP: object;
}
export default Vue.extend({
  data: (): MatchComponentData => ({
    delay: undefined,
    PLAYER_MAP,
  }),
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
      matchFinished: {
        query: gql`
          subscription {
            matchFinished
          }
        `,
        result() {
          return this.reloadAfterResult();
        },
      },
      gameFinished: {
        query: gql`
          subscription {
            gameFinished
          }
        `,
        result() {
          return this.reloadAfterResult();
        },
      },
    },
  },
  methods: {
    reloadAfterResult() {
      if (this.delay) {
        clearTimeout(this.delay);
      }
      this.delay = setTimeout(() => {
        this.$apollo.queries.match.refetch();
      }, 400);
    },
  },
  components: {
    Game,
  },
});
</script>
<style>
.notification {
  color: red;
  position: fixed;
  top: 1em;
  right: 5em;
  padding: 1em;
}
</style>
