<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLoginAttempt">
      <p>
        <TextInput v-model="email" name="email" />
      </p>
      <p>
        <input type="password" v-model="password" name="password" />
      </p>
      <p>
        <button type="submit">Login</button>
      </p>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import TextInput from '../components/TextInput.vue';
import { authenticate } from '../utils/graphql';

export default Vue.extend({
  data: () => ({ password: '', email: '' }),
  components: {
    TextInput,
  },
  methods: {
    async handleLoginAttempt() {
      const authenticated = await authenticate(this.email, this.password);
      if (authenticated) {
        this.$user.load();
      }
    },
  },
});
</script>
