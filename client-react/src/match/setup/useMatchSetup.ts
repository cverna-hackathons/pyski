import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { getPlayers, Player } from '../../graphql/actions/getPlayers';
import {
  DEFAULT_MATCH_INPUT,
  CreateMatchInput,
  CreateMatchResponse,
  createMatch,
} from '../../graphql/actions/createMatch';

type CreateChangeHandler = <T extends keyof CreateMatchInput>(
  inputName: T,
) => (newValue: CreateMatchInput[T]) => void;

interface HookResult {
  matchInput: CreateMatchInput;
  players: Player[];
  createChangeHandler: CreateChangeHandler;
  handleSubmit(event: React.FormEvent): Promise<void>;
}

export const useMatchSetup = (): HookResult => {
  const navigate = useNavigate();
  const { data } = useQuery<{ players: Player[] }>(getPlayers);
  const [matchInput, setMatchInput] = useState<CreateMatchInput>(
    DEFAULT_MATCH_INPUT,
  );
  const [createMatchAction] = useMutation<CreateMatchResponse>(createMatch);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data } = await createMatchAction({
      variables: {
        input: matchInput,
      },
    });

    navigate(`/match/${data?.createMatch?.id}`);
  };

  const createChangeHandler: CreateChangeHandler = (matchInputName) => (
    newValue,
  ) =>
    setMatchInput({
      ...matchInput,
      [matchInputName]: newValue,
    });

  return {
    matchInput,
    players: data?.players ?? [],
    createChangeHandler,
    handleSubmit,
  };
};
