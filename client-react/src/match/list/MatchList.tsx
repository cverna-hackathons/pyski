import React, { useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import {
  getMatches,
  GetMatchesPayload,
} from '../../graphql/actions/getMatches';
import {
  onMatchFinished,
  OnMatchFinishedPayload,
} from '../../graphql/subscriptions/onMatchFinished';
import { MatchListItem } from './MatchListItem';

export const MatchList: React.FC = () => {
  const {
    data: { matches } = {},
    refetch,
    loading,
  } = useQuery<GetMatchesPayload>(getMatches);
  const { data } = useSubscription<OnMatchFinishedPayload>(onMatchFinished);
  useEffect(() => {
    if (data?.matchFinished) {
      refetch();
    }
  }, [data?.matchFinished, refetch]);

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
