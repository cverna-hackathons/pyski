import { defineComponent } from 'vue';
import MatchSetupForm from '../components/MatchSetupForm.vue';

// const MatchSubscription = gql`
//   subscription {
//     matchCreated
//   }
// `

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
  // setup() {
  //   const matches = [];

  //   const res = graphql.subscribe({
  //     query: MatchSubscription,
  //     variables: {}
  //   })

  //   watch(res, (something: any) => {
  //     console.log('matchCreated', something);
  //     matches.push(something);
  //   })
  // }
});
