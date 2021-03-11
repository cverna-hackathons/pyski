import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { GameResult as GameResultType } from '@/store/match';

import GameResult from './GameResult';
import { PLAYER_MAP } from '@/constants';

export default defineComponent({
  components: {
    GameResult,
  },

  computed: {
    ...mapState('match', ['matchResult']),
  },

  render() {
    if (!this.matchResult) {
      return <h1>Ups, no results yet.</h1>;
    }

    const { playersResults, gameResults } = this.matchResult;

    return (
      <div>
        <h1>
          {playersResults[0]}({PLAYER_MAP[1]}) : {playersResults[1]}(
          {PLAYER_MAP[2]})
        </h1>
        <div>
          {gameResults.map((set: GameResultType) => (
            <GameResult game={set} />
          ))}
        </div>
      </div>
    );
  },
});
