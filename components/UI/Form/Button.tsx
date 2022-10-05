import React from 'react';
import classNames from 'classnames';

interface IButton {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  full: boolean;
  disabled: boolean;
}

function Button({ children, onClick, type, full, disabled }: IButton): JSX.Element {
  const buttonClasses = classNames(
    'bg-orange-600 text-white rounded-md px-3 py-1.5 flex justify-center items-baseline disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-500',
    {
      'w-full': full,
      'w-fit': !full,
    },
  );

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  full: false,
  type: 'button',
  disabled: false,
};

export default Button;
