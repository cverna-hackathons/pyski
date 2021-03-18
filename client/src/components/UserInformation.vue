<template>
  <div>
    <pre>user: {{ $user }}</pre>
    <div v-if="$user.isLoaded()">
      <span>
        Logged in as
        <b>{{ currentUser.email }}, </b>
        <a href="#" @click.prevent="handleLogout">log out</a>.
      </span>
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
  methods: {
    handleLogout() {
      return this.$user.logout();
    },
  },
});
</script>
