<template>
  <div>
    <h1>Game [{{ gameId }}]</h1>
    <div v-if="$apollo.queries.game.loading">Loading game...</div>
    <div v-else>
      <span>({{ game.gameIndex + 1 }} of {{ numOfGames }})</span>
      <pre>{{ game }}</pre>
      <Grid :grid="game.grid" />
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
