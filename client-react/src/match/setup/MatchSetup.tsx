import React from 'react';
import { FormInput } from './FormInput';
import { GridDimensionInput } from './GridDimensionInput';
import { RangeInput } from './RangeInput';
import { PlayerSelect } from './PlayerSelect';
import { useMatchSetup } from './useMatchSetup';

export const MatchSetup: React.FC = () => {
  const {
    matchInput: {
      gridWidth,
      gridHeight,
      numOfGames,
      maxRounds,
      winningLength,
      playerA,
      playerB,
    },
    players,
    createChangeHandler,
    handleSubmit,
  } = useMatchSetup();

  return (
    <>
      <h1>Match setup</h1>
      <p>Let's setup a match</p>
      <form onSubmit={handleSubmit}>
        <FormInput name="grid_width" label="Grid width: ">
          <GridDimensionInput
            name="grid_width"
            value={gridWidth}
            onChange={createChangeHandler<'gridWidth'>('gridWidth')}
          />
        </FormInput>
        <FormInput name="grid_height" label="Grid height: ">
          <GridDimensionInput
            name="grid_height"
            value={gridHeight}
            onChange={createChangeHandler<'gridHeight'>('gridHeight')}
          />
        </FormInput>
        <FormInput
          label={`Number of games: ${numOfGames}`}
          name="numOfGames"
          isInline={false}
        >
          <RangeInput
            name="numOfGames"
            min={1}
            max={50}
            value={numOfGames}
            onChange={createChangeHandler<'numOfGames'>('numOfGames')}
          />
        </FormInput>
        <FormInput
          label={`Maximum rounds: ${maxRounds}`}
          name="maxRounds"
          isInline={false}
        >
          <RangeInput
            name="maxRounds"
            min={10}
            max={500}
            step={10}
            value={maxRounds}
            onChange={createChangeHandler<'maxRounds'>('maxRounds')}
          />
        </FormInput>
        <FormInput
          label={`Winning length: ${winningLength}`}
          name="winningLength"
          isInline={false}
        >
          <RangeInput
            name="winningLength"
            min={3}
            max={10}
            value={winningLength}
            onChange={createChangeHandler<'winningLength'>('winningLength')}
          />
        </FormInput>
        <FormInput label="Player A: " name="playerA">
          <PlayerSelect
            name="playerA"
            value={playerA}
            onChange={createChangeHandler<'playerA'>('playerA')}
            players={players}
          />
        </FormInput>
        <FormInput label="Player B: " name="playerB">
          <PlayerSelect
            name="playerB"
            value={playerB}
            onChange={createChangeHandler<'playerB'>('playerB')}
            players={players}
          />
        </FormInput>
        <button type="submit">Let's play</button>
      </form>
    </>
  );
};
