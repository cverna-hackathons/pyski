import React from 'react';
import { useQuery } from '@apollo/client';
import {
  getMatches,
  GetMatchesPayload,
} from '../../graphql/actions/getMatches';
import {
  onMatchFinished,
} from '../../graphql/subscriptions/onMatchFinished';
import { MatchListItem } from './MatchListItem';
import { useRefetchOnSubscription } from '../../graphql/useRefetchOnSubscription';

export const MatchList: React.FC = () => {
  const {
    data: { matches } = {},
    refetch,
    loading,
  } = useQuery<GetMatchesPayload>(getMatches);
  useRefetchOnSubscription(onMatchFinished, refetch);

  if (loading) {
    return <div>Loading matches ...</div>;
  }

  if (!matches) {
    return <div>None found.</div>;
  }

  return (
    <div>
      {matches.map((match) => (
        <MatchListItem key={match.id} match={match} />
      ))}
    </div>
  );
};
