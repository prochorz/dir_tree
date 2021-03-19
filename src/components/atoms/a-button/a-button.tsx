import React from 'react';
import cx from 'classnames';

import Style from './a-button.module.scss';

interface Props {
  className?: string;
  disabled?: boolean;
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AButton(props: Props) {
  const { label, disabled, className, onClick } = props;

  const buttonClass = cx(Style['a-button'], className);

  return (
    <button type="button" className={buttonClass} disabled={disabled} onClick={onClick}>
      <span>{label}</span>
    </button>
  );
}
