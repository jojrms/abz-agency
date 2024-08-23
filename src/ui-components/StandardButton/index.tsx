import React, { ButtonHTMLAttributes } from "react";

type StandardButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export const StandardButton: React.FC<StandardButtonProps> = ({
  title,
  ...props
}) => {
  return (
    <button {...props}>
      <p>{title}</p>
    </button>
  );
};

type StandardButtonGridProps = {
  children: React.ReactNode;
};
export const StandardButtonGrid: React.FC<StandardButtonGridProps> = ({
  children,
}) => {
  return <div className="div-buttons-grid">{children}</div>;
};
