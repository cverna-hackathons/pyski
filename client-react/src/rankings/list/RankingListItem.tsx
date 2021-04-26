import React from 'react';
import {
  PlayerRanking,
} from '../../graphql/actions/getPlayerRankings';

interface Props {
  ranking: PlayerRanking;
}

export const RankingListItem: React.FC<Props> = ({ ranking }) => (
  <tr>
    <td>#{ranking.rank}</td>
    <td>{ranking.name}</td>
    <td>{ranking.score}</td>
  </tr>
);
