import React, { useCallback } from 'react';

interface Player {
  id: string;
  name: string;
  type: string;
}

interface Props {
  name: string;
  value?: string;
  onChange(newId: string): void;
  players?: Player[];
}

export const PlayerSelect: React.FC<Props> = ({
  name,
  value,
  onChange,
  players = [],
}) => {
  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(ev.target.value);
    },
    [onChange],
  );

  return (
    <select name={name} onChange={handleChange} value={value}>
      <option value={undefined}>Please select</option>
      {players.map(({ id, name, type }) => (
        <option value={id} key={id}>
          {name} [{type}]
        </option>
      ))}
    </select>
  );
};
