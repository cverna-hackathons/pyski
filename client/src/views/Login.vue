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
import gql from 'graphql-tag';
import Vue from 'vue';
import TextInput from '../components/TextInput.vue';
import { CurrentUserData } from '../plugins/UserPlugin';
import { authenticate, query } from '../utils/graphql';

type GetUserDataResponse = {
  currentUser: CurrentUserData;
};

export default Vue.extend({
  data: () => ({ password: '', email: '' }),
  components: {
    TextInput,
  },
  methods: {
    async handleLoginAttempt() {
      const authenticated = await authenticate(this.email, this.password);
      console.log('handle', this.email, this.password, authenticated);

      if (authenticated) {
        const { currentUser } = await query<GetUserDataResponse>(
          gql`
            query {
              currentUser {
                id
                name
                email
              }
            }
          `,
          {},
        );
        this.$user.set(currentUser);
        console.log('this.user after set', this.$user);
      }
    },
  },
});
</script>
