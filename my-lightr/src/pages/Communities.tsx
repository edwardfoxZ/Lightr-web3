import React from "react";
import { Titles } from "../components/utils/Titles.tsx";
import { NavBarTitle } from "../components/utils/NavBarTitle.tsx";

export const Communities = () => {
  return (
    <div className="Communities w-full h-[104vh]">
      <NavBarTitle titleBar="Communities" />
      <Titles className="px-5" title="Communities" />
    </div>
  );
};
