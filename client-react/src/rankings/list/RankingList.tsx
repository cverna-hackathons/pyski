import React from 'react';
import { useQuery } from '@apollo/client';
import {
  onMatchFinished,
} from '../../graphql/subscriptions/onMatchFinished';
import { RankingListItem } from './RankingListItem';
import { useRefetchOnSubscription } from '../../graphql/useRefetchOnSubscription';
import {
  getPlayerRankings,
  GetPlayerRankingsPayload,
} from '../../graphql/actions/getPlayerRankings';

export const RankingsList: React.FC = () => {
  const {
    data: { playerRankings } = {},
    refetch,
    loading,
  } = useQuery<GetPlayerRankingsPayload>(getPlayerRankings);
  useRefetchOnSubscription(onMatchFinished, refetch);

  if (loading) {
    return <div>Loading rankings ...</div>;
  }

  if (!playerRankings) {
    return <div>None found.</div>;
  }

  return (
    <table style={{ minWidth: '20em' }}>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {playerRankings.map((ranking) => (
          <RankingListItem key={ranking.id} ranking={ranking} />
        ))}
      </tbody>
    </table>
  );
};
