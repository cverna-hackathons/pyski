<template>
  <span>{{ match.playerAScore }} : {{ match.playerBScore }}</span>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    match: Object,
  },
});
</script>
