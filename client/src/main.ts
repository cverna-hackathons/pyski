import Vue from 'vue';
import App from './App.vue';
import createProvider from 'vue-apollo';
import VueRouter from 'vue-router';
import ApolloClient from 'apollo-boost';
import { API_URI } from './actions/request';

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  apolloProvider: new createProvider({
    defaultClient: new ApolloClient({
      uri: `${API_URI}/graphql`,
    }),
  }),
  render: h => h(App),
}).$mount('#app');
