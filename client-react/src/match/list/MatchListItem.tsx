import React from 'react';
import { Link } from 'react-router-dom';
import { MatchScore } from '../../graphql/actions/getMatches';

interface Props {
  match: MatchScore;
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
