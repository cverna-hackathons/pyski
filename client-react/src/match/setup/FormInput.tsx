import React from 'react';

interface Props {
  label: string;
  name: string;
  isInline?: boolean;
}

export const FormInput: React.FC<Props> = ({
  children,
  label,
  name,
  isInline = true,
}) => {
  const Wrapper = isInline ? 'span' : 'div';
  return (
    <p>
      <label htmlFor={name}>{label}</label>
      <Wrapper>{children}</Wrapper>
    </p>
  );
};
