import React, { useCallback } from 'react';
import { GRID_SIZES } from '../../constants';

interface Props {
  name: string;
  value: number;
  onChange(selectedDimension: number): void;
}

export const GridDimensionInput: React.FC<Props> = ({ name, onChange, value }) => {
  const handleChange = useCallback((ev: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(parseInt(ev.target.value, 10));
  }, [onChange])

  return (
    <select name={name} onChange={handleChange} value={value}>
      {GRID_SIZES.map((size) => (
        <option value={size} key={size}>{size}</option>
      ))}
    </select>
  );
};
