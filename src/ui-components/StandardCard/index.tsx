import React from "react";
import { StandardTooltip } from "../StandardTooltip";
import './style.scss';

type StandardUserCardProps = {
  name: string;
  position: string;
  email: string;
  phone: string;
  photo: string;
};

export const StandardUserCard = ({
  name,
  position,
  email,
  phone,
  photo,
}: StandardUserCardProps) => {
  return (
    <article className="user-card">
      <figure>
        <img src={photo} width={70} height={70} />
      </figure>
      <div className="content-name">
        <StandardTooltip label={name}>
          <p>{name}</p>
        </StandardTooltip>
      </div>
      <div className="content-infos">
        <p>{position}</p>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
    </article>
  );
};

type StandardCardGridProps = {
  children: React.ReactNode;
};
export const StandardCardGrid: React.FC<StandardCardGridProps> = ({
  children,
}) => {
  return <div className="div-cards-grid">{children}</div>;
};
