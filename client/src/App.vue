<template>
  <div id="app-container">
    <div id="nav">
      <NotificationContainer />
      <UserInformation />
      <router-view />
      <router-link to="/">Home</router-link> |
      <router-link to="/matches">Matches</router-link> |
      <span v-if="$user.isLoaded()">
        <router-link to="/setup">New match</router-link> |
        <router-link to="/" @click.native="$user.logout">
          Logout
        </router-link>
      </span>
      <router-link v-else to="/login">
        Login
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import router from './router';
import VueApollo from 'vue-apollo';
import { graphql } from './utils/graphql';
import UserInformation from './components/UserInformation.vue';
import { User } from './plugins/UserPlugin';
import NotificationContainer from './components/Notifications.vue';

Vue.use(VueApollo);
Vue.use(User);

Vue.config.errorHandler = (error: Error, vm: Vue, info: string) => {
  console.log('errorHandler', error, vm, info);
  vm.$notify({
    text: `Error occured! ${error.message} [${info}]`,
    type: 'error',
  });
};
export default Vue.extend({
  components: {
    UserInformation,
    NotificationContainer,
  },
  apolloProvider: new VueApollo({
    defaultClient: graphql,
  }),
  mounted() {
    this.$user.load();
  },
  router,
});
</script>

<style lang="scss">
#app-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
