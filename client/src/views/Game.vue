<template>
  <div>
    <h1>Game [{{ gameId }}]</h1>
    <div v-if="$apollo.queries.game.loading">Loading game...</div>
    <div v-else>
      <p>
        ({{ game.gameIndex + 1 }} of {{ numOfGames }}) [{{ game.statusLabel }}]
      </p>
      <Grid :grid="game.grid" />
      <pre>{{ game }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import Vue from 'vue';
import Grid from './Grid.vue';

export default Vue.extend({
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
    game: {
      query: gql`
        query($id: String!) {
          game(id: $id) {
            gameIndex
            grid
            isFinished
            statusLabel
            match {
              id
              winningLength
            }
            nextMove {
              id
              x
              y
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
