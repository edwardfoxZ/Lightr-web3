import React from "react";
import { SearchInput } from "./utils/SearchInput.tsx";
import { CloseIcon } from "./Icons/index.tsx";
import { RiGroupLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi2";

import { useHandleShowCancel } from "./hooks/useShowCancel.ts";
import { thingsColor } from "./index/index.tsx";

export const NewChat = ({ handlePopDown, isVisible }) => {
  const { isShowCancel, handleInputClick, handleShowCancelBu } =
    useHandleShowCancel();

  return (
    <div
      className={`PopUp w-full h-full bg-[aliceblue] flex flex-col relative p-3 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`flex flex-row items-center mx-auto py-3 transition-all duration-100 ease-linear ${
          !isShowCancel ? "opacity-100" : "opacity-0 -mt-12"
        }`}
      >
        <h1 className="flex mx-auto font-bold">New Chat</h1>
        <CloseIcon onClick={handlePopDown} />
      </div>

      <div className="mt-2">
        <SearchInput
          placeHolder="Search name or number"
          onInputClick={handleInputClick}
          onCancelClick={handleShowCancelBu}
          isShowCancel={isShowCancel}
        />
      </div>

      <div className="bg-white rounded-xl mt-8">
        <div className="flex flex-row items-center gap-5 p-3 px-8 active:bg-gray-300 active:rounded-t-xl cursor-pointer">
          <RiGroupLine color={thingsColor} size="21" />
          <p className="font-medium">New Group</p>
        </div>
        <hr />
        <button className="w-full flex flex-row items-center gap-5 p-3 px-8 active:bg-gray-300 active:rounded-b-xl cursor-pointer">
          <HiOutlineUserGroup color={thingsColor} size="22" />
          <p className="font-medium">New community</p>
        </button>
      </div>
    </div>
  );
};
