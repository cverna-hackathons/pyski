<template>
  <div>
    <h1>Game [#{{ gameId }}]</h1>
    <div v-if="$apollo.queries.game.loading">Loading game...</div>
    <div v-else>
      <p>
        ({{ game.gameIndex + 1 }} of {{ numOfGames }}) [{{ game.statusLabel }}]
      </p>
      <Grid :grid="game.grid" />
      <!-- <pre>{{ game }}</pre> -->
    </div>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import Vue from 'vue';
import Grid from './Grid.vue';

interface MoveCreatedData {
  moveCreated: string;
}

interface MoveCreatedResult {
  data: MoveCreatedData;
}

interface GameComponentData {
  delay?: ReturnType<typeof setTimeout>;
}

export default Vue.extend({
  data: (): GameComponentData => ({ delay: undefined }),
  components: {
    Grid,
  },
  props: {
    gameId: String,
    numOfGames: {
      type: Number,
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
        result({ data: { moveCreated } }: MoveCreatedResult) {
          if (this.delay) {
            clearTimeout(this.delay);
          }
          this.delay = setTimeout(() => {
            console.info('refetching after move', moveCreated);
            this.$apollo.queries.game.refetch();
          }, 1000);
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
            nextPlayerIndex
            statusLabel
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
