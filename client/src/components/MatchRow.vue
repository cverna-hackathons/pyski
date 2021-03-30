<template>
  <div>
    <h4>
      #{{ match.id }}:
      <RouterLink :to="`/match/${match.id}`">
        {{ match.playerA.name }} vs. {{ match.playerB.name }}
        <MatchResult :match="match" />
      </RouterLink>
    </h4>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MatchResult from './MatchResult.vue';

export default Vue.extend({
  components: {
    MatchResult,
  },
  props: {
    match: Object,
  },
});
</script>
