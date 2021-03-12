<template>
  <div id="app-container">
    <div id="nav">
      <router-view />
      <router-link to="/">Home</router-link> |
      <router-link to="/setup">New match</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import { store } from './store';
import createProvider from 'vue-apollo';
import ApolloClient from 'apollo-boost';
import { API_URI } from './actions/request';
import VueApollo from 'vue-apollo';

Vue.use(Vuex);
Vue.use(VueApollo);

export default Vue.extend({
  apolloProvider: new createProvider({
    defaultClient: new ApolloClient({
      uri: `${API_URI}/graphql`,
    }),
  }),
  router,
  store: new Vuex.Store(store),
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
