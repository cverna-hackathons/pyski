// import { graphql } from '@/utils/graphql';
// import { gql } from '@apollo/client';
import MatchSetupForm from '../components/MatchSetupForm.vue';
import Vue from 'vue';

// const MatchSubscription = gql`
//   subscription {
//     matchCreated
//   }
// `

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
