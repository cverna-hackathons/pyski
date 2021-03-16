import { gql } from '@apollo/client/core';
export const getMatch = gql`
  query($id: String!) {
    match(id: $id) {
      id
      gridHeight
      gridWidth
      isFinished
      maxRounds
      numOfGames
      playerAScore
      playerBScore
      timeout
      winningLength
      games {
        id
        gameIndex
        faultOfPlayer
        winner
      }
      playerA {
        id
        name
      }
      playerB {
        id
        name
      }
    }
  }
`;
