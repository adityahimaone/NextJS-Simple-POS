import React from "react";

interface IButtonIcon {
  children: React.ReactNode;
  onClick?: () => void;
}

function ButtonIcon({ children, onClick }: IButtonIcon): JSX.Element {
  return (
    <button
      type="button"
      className="px-4 py-0.5 flex text-lg justify-center items-center rounded-md border border-amber-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
