import React from "react";
import './style.scss';

type StandardTooltipProps = {
  label: string;
  children: React.ReactNode;
};

export const StandardTooltip: React.FC<StandardTooltipProps> = ({
  label,
  children,
}) => {
  return (
    <div id={"divTooltip"} className="div-tooltip">
      {children}
      <span id={"spanTooltip"} title={label} className="span-tooltip">
        {label}
      </span>
    </div>
  );
};
