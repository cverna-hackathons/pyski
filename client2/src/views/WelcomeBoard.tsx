import Vue from 'vue';

export default Vue.extend({
  computed: {
    greeting() {
      return 'Hi pyskonator!';
    },
  },
  render() {
    return (
      <div>
        <h1>{this.greeting}</h1>
        <p>What do you want to do today?</p>
        <router-link to="/setup">Algo SHOWDOWN!!!!!</router-link>
      </div>
    );
  },
});
