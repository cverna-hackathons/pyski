import { defineComponent } from 'vue';
import { PLAYER_MAP } from '@/constants';

export default defineComponent({
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  render() {
    const { lastGrid } = this.game;
    return (
      <table>
        {lastGrid.map((row: number[]) => {
          return (
            <tr>
              {row.map(value => (
                <td>{PLAYER_MAP[value]}</td>
              ))}
            </tr>
          );
        })}
      </table>
    );
  },
});
