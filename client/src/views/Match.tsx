import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  components: {},
  computed: {
    ...mapState('match', ['match']),
    matchId() {
      return this.$route.params.matchId;
    },
  },
  methods: {
    ...mapActions('match', ['getMatch']),
  },
  mounted() {
    this.getMatch(this.matchId);
  },
  render() {
    if (this.match && this.match.id) {
      return (
        <h1>
          The match {this.matchId} : Wl - {this.match.winningLength}
        </h1>
      );
    }

    return <h2>Loading match...</h2>;
  },
});
