import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getMatch, GetMatchPayload } from '../../graphql/actions/getMatch';
import { onGameFinished } from '../../graphql/subscriptions/onGameFinished';
import {
  onMatchFinished,
  OnMatchFinishedPayload,
} from '../../graphql/subscriptions/onMatchFinished';
import { MatchDetailView } from './MatchDetailView';
import { useRefetchOnSubscription } from '../../graphql/useRefetchOnSubscription';

export const MatchDetail: React.FC = () => {
  const { matchId } = useParams();
  const { data, refetch } = useQuery<GetMatchPayload>(getMatch, {
    variables: {
      id: matchId,
    },
  });
  useRefetchOnSubscription(onGameFinished, refetch);
  useRefetchOnSubscription(onMatchFinished, refetch);

  return <MatchDetailView matchId={matchId} match={data?.match} />;
};
