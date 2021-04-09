import React  from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { getGame, GetGamePayload } from '../graphql/actions/getGame';
import { PLAYER_MAP } from '../constants';
import { onMoveCreated } from '../graphql/subscriptions/onMoveCreated';
import { Grid } from './Grid';
import { useRefetchOnSubscription } from '../graphql/useRefetchOnSubscription';
import {
  makeInteractiveMove,
  MakeInteractiveMoveInput,
} from '../graphql/actions/makeInteractiveMove';

interface Props {
  gameId: string;
  numOfGames: number;
}

export const GameView: React.FC<Props> = ({ gameId, numOfGames }) => {
  const { data, refetch } = useQuery<GetGamePayload>(getGame, {
    variables: {
      id: gameId,
    },
  });
  useRefetchOnSubscription(onMoveCreated, refetch);
  const [makeMove] = useMutation(makeInteractiveMove);
  const handleCellClick = async (x: number, y: number) => {
    const input: MakeInteractiveMoveInput = {
      x,
      y,
      gameId,
    };
    await makeMove({
      variables: {
        input,
      },
    });
    refetch();
  };

  const game = data?.game;

  return (
    <div>
      <h1>Game [#{gameId}]</h1>
      {!game && <div>Loading game...</div>}
      {game && (
        <div>
          <p>
            ({game.gameIndex + 1} of {numOfGames}) [{game.statusLabel}]
          </p>

          {game.isFinished && (
            <p style={{ color: 'red' }}>
              Winner
              <strong> {PLAYER_MAP[game.winner]}</strong>
            </p>
          )}
          {game.isFinished && game.faultOfPlayer && (
            <p style={{ color: 'violet' }}>
              Fault of player <strong> {PLAYER_MAP[game.faultOfPlayer]}</strong>
            </p>
          )}

          <Grid
            grid={game.grid}
            isInteractive={game.nextPlayerIsInteractive}
            nextValue={game.nextPlayerValue}
            onCellClick={handleCellClick}
          />

          {game.nextPlayerIsInteractive && !game.isFinished && (
            <p style={{ color: 'green', fontWeight: 'bold' }}>
              Awaiting your move...
            </p>
          )}
        </div>
      )}
    </div>
  );
};
