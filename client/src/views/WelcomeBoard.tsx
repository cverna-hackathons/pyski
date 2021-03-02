import { defineComponent } from 'vue';
export default defineComponent({
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
      </div>
    );
  },
});
