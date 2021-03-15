import Vue from 'vue';

export default Vue.extend({
  props: {
    size: {
      type: Number,
    },
  },
  render() {
    return <option value={this.size}>{this.size}</option>;
  },
});
