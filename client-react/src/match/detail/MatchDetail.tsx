import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useSubscription } from '@apollo/client';
import { getMatch, GetMatchPayload } from '../../graphql/actions/getMatch';
import {
  onGameFinished,
  OnGameFinishedPayload,
} from '../../graphql/subscriptions/onGameFinished';
import {
  onMatchFinished,
  OnMatchFinishedPayload,
} from '../../graphql/subscriptions/onMatchFinished';
import { MatchDetailView } from './MatchDetailView';

export const MatchDetail: React.FC = () => {
  const { matchId } = useParams();
  const { data, refetch } = useQuery<GetMatchPayload>(getMatch, {
    variables: {
      id: matchId,
    },
  });
  const { data: gameFinishedPayload } = useSubscription<OnGameFinishedPayload>(
    onGameFinished,
  );
  const { data: matchFinishedPayload } = useSubscription<OnMatchFinishedPayload>(
    onMatchFinished,
  );

  useEffect(() => {
    if (gameFinishedPayload?.gameFinished) {
      refetch();
    }
  }, [refetch, gameFinishedPayload?.gameFinished]);

  useEffect(() => {
    if (matchFinishedPayload?.matchFinished === matchId) {
      refetch();
    }
  }, [refetch, matchFinishedPayload?.matchFinished, matchId]);

  return (
    <MatchDetailView matchId={matchId} match={data?.match} />
  )
};
