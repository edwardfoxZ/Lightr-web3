import React from "react";

export const Titles = ({ title, className }: any) => {
  return (
    <>
      <h1
        className={`font-bold text-3xl mt-20 transition-all duration-100 ease-linear ${className}`}
      >
        {title}
      </h1>
    </>
  );
};
