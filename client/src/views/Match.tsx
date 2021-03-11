import Vue from 'vue';

export default Vue.extend({
  components: {},
  computed: {
    matchId() {
      return this.$route.params.matchId;
    },
  },
  render() {
    return <h1>The match {this.matchId}</h1>;
  },
});
