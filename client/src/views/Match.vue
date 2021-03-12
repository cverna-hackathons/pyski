<template>
  <div>
    <h1>Match [{{ matchId }}]</h1>
    <div v-if="match">
      <pre>{{ match }}</pre>
      <span>Loaded match</span>
      <div>
        <Game
          v-for="game of match.games"
          :game="game"
          :gameId="game.id"
          :numOfGames="match.numOfGames"
          :key="game.id"
        />
      </div>
    </div>
    <div v-else>Loading match</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import Game from './Game.vue';

export default Vue.extend({
  apollo: {},
  components: {
    Game,
  },
  computed: {
    ...mapState('match', ['match']),
    matchId() {
      return this.$route.params.matchId;
    },
  },
  methods: {
    ...mapActions('match', ['getMatch']),
  },
  mounted() {
    this.getMatch(this.matchId);
  },
});
</script>
