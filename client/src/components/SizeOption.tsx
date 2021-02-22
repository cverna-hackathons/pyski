import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    size: {
      type: Number,
    },
  },
  render() {
    return <option value={this.size}>{this.size}</option>
  },
})
