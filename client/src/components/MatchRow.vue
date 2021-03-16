<template>
  <div>
    <h4>
      #{{ match.id }}:
      <RouterLink :to="`/match/${match.id}`">{{ match.playerA.name }} vs. {{ match.playerB.name }}</RouterLink>
    </h4>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    match: Object,
  },
});
</script>
<style>
.range-input span {
  position: relative;
  margin: auto 0.5em;
  top: -0.3em;
}
</style>
