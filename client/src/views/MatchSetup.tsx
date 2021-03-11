import { gql, useSubscription } from '@apollo/client';
import { defineComponent, watch } from 'vue';
import MatchSetupForm from '../components/MatchSetupForm.vue';

const MatchSubscription = gql`
  subscription {
    matchCreated
  }
`

export default defineComponent({
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
  setup() {
    const matches = [];
    const { data } = useSubscription(MatchSubscription);

    watch(data, ({ matchCreated }: { matchCreated: boolean }) => {
      console.log('matchCreated', matchCreated);
      matches.push(matchCreated);
    })
  }
});
