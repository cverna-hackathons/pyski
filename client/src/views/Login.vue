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
      <p>
        Don't have an account yet?
        <router-link to="/signup">Sign up</router-link>
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
        await this.$user.load();
        this.$notify({
          text: 'Logged in.',
          type: 'success',
        });
        this.$router.push('/');
      } else {
        this.$notify({
          duration: 10000,
          text: 'Incorrect username or password.',
          type: 'error',
        });
      }
    },
  },
});
</script>
