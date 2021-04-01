import React, { ChangeEvent, useCallback } from 'react';

interface Props {
  name: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange(newValue: number): void;
}

export const RangeInput: React.FC<Props> = ({
  name,
  min,
  max,
  step = 1,
  value,
  onChange,
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(parseInt(event.target.value, 10));
    },
    [onChange],
  );

  return (
    <>
      <span>{min}</span>
      <input
        type="range"
        name={name}
        max={max}
        min={min}
        value={value}
        onChange={handleChange}
      />
      <span>{max}</span>
    </>
  );
};

