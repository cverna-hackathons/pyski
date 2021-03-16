import MatchSetupForm from '../components/MatchSetupForm.vue';
import Vue from 'vue';

export default Vue.extend({
  components: {
    MatchSetupForm,
  },
  render() {
    return (
      <div>
        <h1>Match setup</h1>
        <i>Let's set a match up!</i>
        <MatchSetupForm />
      </div>
    );
  },
});
