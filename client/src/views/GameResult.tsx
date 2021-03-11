import Vue from 'vue';
import { PLAYER_MAP } from '@/constants';

export default Vue.extend({
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  render() {
    const { lastGrid, winner, playerMarks } = this.game;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '25px',
        }}
      >
        <div>
          <table
            style={{
              margin: '0 auto',
              borderSpacing: 0,
              borderCollapse: 'collapse',
            }}
          >
            {lastGrid.map((row: number[]) => {
              return (
                <tr>
                  {row.map(value => (
                    <td
                      style={{
                        border: '1px solid grey',
                        width: '25px',
                        height: '25px',
                      }}
                    >
                      {PLAYER_MAP[value]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </table>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: '25px',
          }}
        >
          Winner: {PLAYER_MAP[playerMarks[winner]]}
        </div>
      </div>
    );
  },
});
