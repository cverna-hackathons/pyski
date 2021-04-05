import React from 'react';
import { Link } from 'react-router-dom';
import { Match } from '../../graphql/actions/getMatches';

interface Props {
  match: Match;
}

export const MatchListItem: React.FC<Props> = ({ match }) => (
  <h4>
    #{match.id}:{' '}
    <Link to={`/match/${match.id}`}>
      {match.playerA.name} vs. {match.playerB.name}{' '}
      <span>
        {match.playerAScore} : {match.playerBScore}
      </span>
    </Link>
  </h4>
);
