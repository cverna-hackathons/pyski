import { gql } from '@apollo/client/core';
export const getMatch = gql`
  query($id: String!) {
    match(id: $id) {
      id
      gridHeight
      gridWidth
      maxRounds
      numOfGames
      timeout
      winningLength
      games {
        id
        gameIndex
        playerIndex
        faultOfPlayer
        winner
      }
    }
  }
`;
