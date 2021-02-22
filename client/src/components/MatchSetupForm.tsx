import { defineComponent } from 'vue'

const GRID_SIZES: number[] = [ 10, 30, 50, 100 ]
export const MatchSetup = defineComponent({
  data() {
    return {
      GRID_SIZES,
    }
  },
  methods: {
    renderSizeOption(size: number) {
      return (
        <option value={size}>
          {size}
        </option>
      )
    },
  },
  render() {
    return (
      <div>
        <form action="/match" method="post">
          <select name="grid_width">
            {GRID_SIZES.map(this.renderSizeOption)}
          </select>
        </form>
      </div>
    )
  },
})
