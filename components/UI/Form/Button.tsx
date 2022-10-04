import React from "react";
import classNames from "classnames";

interface IButton {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  full: boolean;
}

function Button({ children, onClick, type, full }: IButton): JSX.Element {
  const buttonClasses = classNames(
    "bg-orange-600 text-white rounded-md px-3 py-1.5 flex justify-center items-baseline",
    {
      "w-full": full,
      "w-fit": !full,
    }
  );

  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  full: false,
  type: "button",
};

export default Button;
