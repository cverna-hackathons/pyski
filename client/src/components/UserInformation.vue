<template>
  <div>
    <pre>user: {{ $user }}</pre>
    <div v-if="$user.isLoaded()">
      <span>Logged in: {{ currentUser }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    currentUser() {
      return this.$user.get();
    },
  },
});
</script>
