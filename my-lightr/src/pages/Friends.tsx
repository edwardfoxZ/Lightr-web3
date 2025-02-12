import React from "react";
import { Titles } from "../components/utils/Titles.tsx";
import { useHandleShowCancel } from "../components/hooks/useShowCancel.ts";
import { SearchInput } from "../components/utils/SearchInput.tsx";
import { NavBarTitle } from "../components/utils/NavBarTitle.tsx";

export const Friends = () => {
  const { handleInputClick, handleShowCancelBu, isShowCancel } =
    useHandleShowCancel();

  return (
    <div
      className={`Friends w-full h-[104vh] overflow-hidden ${
        isShowCancel ? "-translate-y-16" : ""
      } transition-transform duration-200`}
    >
      <NavBarTitle titleBar="Friends" />
      <Titles className="px-5" title="Friends" />
      <div className="mt-1 px-5">
        <SearchInput
          onCancelClick={handleShowCancelBu}
          isShowCancel={isShowCancel}
          onInputClick={handleInputClick}
          placeHolder="Search to invite by user id ie:0x123..."
        />
      </div>
    </div>
  );
};
