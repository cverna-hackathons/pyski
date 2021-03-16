<template>
  <div id="app-container">
    <div id="nav">
      <router-view />
      <router-link to="/">Home</router-link> |
      <router-link to="/matches">List</router-link> |
      <router-link to="/setup">New match</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import router from './router';
import createProvider from 'vue-apollo';
import VueApollo from 'vue-apollo';
import { graphql } from './utils/graphql';

Vue.use(VueApollo);

export default Vue.extend({
  apolloProvider: new createProvider({
    defaultClient: graphql,
  }),
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
