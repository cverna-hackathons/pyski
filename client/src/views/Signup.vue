<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSignupAttempt">
      <p>
        <label>
          Name (Nickname):
          <br />
          <TextInput v-model="name" name="name" />
        </label>
      </p>
      <p>
        <label>
          Email:
          <br />
          <TextInput v-model="email" name="email" />
        </label>
      </p>
      <p>
        <label>
          Password:
          <br />
          <input type="password" v-model="password" name="password" />
        </label>
      </p>
      <p>
        <label>
          Confirm password:
          <br />
          <input
            type="password"
            v-model="passwordConfirmation"
            name="passwordConfirmation"
          />
        </label>
      </p>
      <div :style="{ color: 'red' }">
        <p v-if="!passwordMatchesConfirmation">
          Passwords have to match.
        </p>
        <p v-if="!passwordRulesMet">
          Password has to be between {{ passwordRules.minLength }} and
          {{ passwordRules.maxLength }} characters long.
        </p>
        <p v-if="!nameRulesMet">
          Name (nickname) has to be between {{ nameRules.minLength }} and
          {{ nameRules.maxLength }} characters long.
        </p>
      </div>
      <p>
        <button type="submit" :disabled="!inputValid">Submit</button>
      </p>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import TextInput from '../components/TextInput.vue';
import { signupUser } from '../queries/signupUser';
import { mutate } from '../utils/graphql';

const PASSWORD_RULES = {
  minLength: 5,
  maxLength: 128,
};
const NAME_RULES = {
  minLength: 4,
  maxLength: 64,
};

type SignupResponseData = {
  signupUser: boolean;
};

export default Vue.extend({
  data: () => ({
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
  }),
  components: {
    TextInput,
  },
  computed: {
    passwordRulesMet(): boolean {
      return (
        this.password.length >= PASSWORD_RULES.minLength &&
        this.password.length <= PASSWORD_RULES.maxLength
      );
    },
    nameRulesMet(): boolean {
      return (
        this.name.length >= NAME_RULES.minLength &&
        this.name.length <= NAME_RULES.maxLength
      );
    },
    passwordMatchesConfirmation(): boolean {
      return this.password === this.passwordConfirmation;
    },
    inputValid(): boolean {
      return (
        this.passwordRulesMet &&
        this.nameRulesMet &&
        this.passwordMatchesConfirmation
      );
    },
    passwordRules() {
      return PASSWORD_RULES;
    },
    nameRules() {
      return NAME_RULES;
    },
  },
  methods: {
    async handleSignupAttempt() {
      const { signupUser: success } = await mutate<SignupResponseData>(
        signupUser,
        {
          input: {
            email: this.email,
            name: this.name,
            password: this.password,
          },
        },
      );
      console.log('handleSignupAttempt', success);
      if (success) {
        this.$router.push('/login');
      }
    },
  },
});
</script>
