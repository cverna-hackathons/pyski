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
import { mutate } from '../utils/graphql';

type LoginResponseData = {
  data: object;
};

export default Vue.extend({
  data: () => ({ password: '', email: '' }),
  components: {
    TextInput,
  },
  methods: {
    async handleLoginAttempt() {
      console.log('handleLoginAttempt', this.email, this.password);

      const { data } = await mutate<LoginResponseData>(
        gql`
          mutation($input: UserLoginInput!) {
            loginUser(input: $input)
          }
        `,
        {
          input: {
            email: this.email,
            password: this.password,
          },
        },
      );
      console.log('login response', data);
    },
  },
});
</script>
