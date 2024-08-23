import React from "react";

export function randomSkeletonQuantity(skeleton: React.ReactNode) {
  const skeletonQuantity: number = Math.floor(Math.random() * 4) + 3;

  return (
    <>
      {Array.from({ length: skeletonQuantity }, (_, index) => (
        <React.Fragment key={index}>{skeleton}</React.Fragment>
      ))}
    </>
  );
}
