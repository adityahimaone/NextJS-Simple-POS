import React from "react";
import classNames from "classnames";

interface IButton {
  children: React.ReactNode;
  onClick?: () => void;
  full: boolean;
}

function Button({ children, onClick, full }: IButton): JSX.Element {
  const buttonClasses = classNames(
    "bg-orange-600 text-white rounded-md px-3 py-1.5 flex justify-center items-baseline",
    {
      "w-full": full,
      "w-fit": !full,
    }
  );

  return (
    <button type="button" onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  full: false,
};

export default Button;
