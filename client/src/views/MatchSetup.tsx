import { defineComponent } from 'vue'
import MatchSetupForm from '../components/MatchSetupForm.vue'

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
    )
  },
})
