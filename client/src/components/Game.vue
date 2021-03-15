<template>
  <div>
    <h1>Game [#{{ gameId }}]</h1>
    <div v-if="$apollo.queries.game.loading" class="notification">
      Loading game...
    </div>
    <div v-if="game">
      <p>
        ({{ game.gameIndex + 1 }} of {{ numOfGames }}) [{{ game.statusLabel }}]
      </p>
      <p :style="{ color: 'red' }" v-if="game.isFinished">
        Winner
        <strong> {{ PLAYER_MAP[game.winner] }}</strong>
      </p>
      <p
        :style="{ color: 'violet' }"
        v-if="game.isFinished && game.faultOfPlayer"
      >
        Fault of player
        <strong> {{ PLAYER_MAP[game.faultOfPlayer] }}</strong>
      </p>
      <Grid
        :grid="game.grid"
        :isInteractive="game.nextPlayerIsInteractive"
        :nextValue="game.nextPlayerValue"
        @moveSelected="handleMoveSelected"
      />
      <p
        v-if="game.nextPlayerIsInteractive"
        :style="{
          color: 'green',
          fontWeight: 'bold',
        }"
      >
        Awaiting your move...
      </p>
      <!-- <pre>{{ game }}</pre> -->
    </div>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import Vue from 'vue';
import { mutate } from '../utils/graphql';
import Grid from './Grid.vue';
import { PLAYER_MAP } from '../constants';

// interface MoveCreatedData {
//   moveCreated: string;
// }

// interface MoveCreatedResult {
//   data: MoveCreatedData;
// }

interface MoveSelection {
  x: number;
  y: number;
  value: number;
}

interface GameComponentData {
  delay?: ReturnType<typeof setTimeout>;
  PLAYER_MAP: object;
}

export default Vue.extend({
  data: (): GameComponentData => ({
    delay: undefined,
    PLAYER_MAP,
  }),
  components: {
    Grid,
  },
  props: {
    gameId: String,
    numOfGames: {
      type: Number,
    },
  },
  methods: {
    async handleMoveSelected({ x, y }: MoveSelection) {
      const gameId = this.gameId;
      await mutate(
        gql`
          mutation($input: GameMoveInput!) {
            makeInteractiveMove(input: $input)
          }
        `,
        {
          input: {
            gameId,
            x,
            y,
          },
        },
      );
    },
  },
  apollo: {
    $subscribe: {
      moveCreated: {
        query: gql`
          subscription {
            moveCreated
          }
        `,
        result(/* _data: MoveCreatedResult */) {
          if (this.delay) {
            clearTimeout(this.delay);
          }
          this.delay = setTimeout(() => {
            this.$apollo.queries.game.refetch();
          }, 400);
        },
      },
    },
    game: {
      query: gql`
        query($id: String!) {
          game(id: $id) {
            gameIndex
            grid
            isFinished
            faultOfPlayer
            nextPlayerIndex
            nextPlayerIsInteractive
            nextPlayerValue
            statusLabel
            winner
            match {
              id
              winningLength
            }
            moves {
              id
              moveIndex
              x
              y
            }
          }
        }
      `,
      variables() {
        return {
          id: this.gameId,
        };
      },
    },
  },
});
</script>
