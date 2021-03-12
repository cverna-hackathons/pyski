<template>
  <div>
    <h1>Our match {{ matchId }}</h1>
    <pre>{{ match }}</pre>
    <div v-if="match">
      <span>Loaded match</span>
    </div>
    <div v-else>Loading match</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  components: {},
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
