import React from 'react';
import { Match } from '../../graphql/actions/getMatch';
import { PLAYER_MAP } from '../../constants';
import { GameView } from '../../game/GameView';

interface Props {
  matchId: string;
  match?: Match;
}

export const MatchDetailView: React.FC<Props> = ({ matchId, match }) => {
  return (
    <div>
      <h1>
        Match [#{matchId}]{match?.isFinished && <span>(Finished)</span>}
      </h1>
      {!match && <div>Loading match...</div>}
      {match && (
        <div>
          <h2>
            {match.playerAScore} : {match.playerBScore}
          </h2>
          <h3>Options</h3>
          <div>
            <ul>
              <li>Winning length: {match.winningLength}</li>
              <li>
                Player A [{match.playerA.name}]:
                <strong>{PLAYER_MAP[1]}</strong>
              </li>
              <li>
                Player B [{match.playerB.name}]:
                <strong>{PLAYER_MAP[2]}</strong>
              </li>
            </ul>
          </div>
          <div>
            {match.games.map((game) => (
              <GameView gameId={game.id} numOfGames={match.numOfGames} key={game.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
