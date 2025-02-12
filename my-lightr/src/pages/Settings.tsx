import React, { useEffect } from "react";
import { SearchInput } from "../components/utils/SearchInput.tsx";
import { useHandleShowCancel } from "../components/hooks/useShowCancel.ts";
import { Titles } from "../components/utils/Titles.tsx";
import { VscKey } from "react-icons/vsc";
import { FiHeart, FiStar, FiLock, FiHelpCircle } from "react-icons/fi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { PiNotificationFill } from "react-icons/pi";
import { thingsColor } from "../components/index/index.tsx";

export const Settings = ({ userName, userStory, userNumber, userEmail }) => {
  const { isShowCancel, handleInputClick, handleShowCancelBu } =
    useHandleShowCancel();

  return (
    <div
      className={`Settings px-3 overflow-hidden ${
        isShowCancel ? "-translate-y-24" : ""
      } transition-transform`}
    >
      <Titles
        title="Settings"
        className={isShowCancel ? "-translate-y-64" : ""}
      />

      <div className="mt-2">
        <SearchInput
          placeHolder="Search"
          onInputClick={handleInputClick}
          onCancelClick={handleShowCancelBu}
          isShowCancel={isShowCancel}
        />
      </div>
      <div className="Profile-conainer bg-white rounded-xl p-3 mt-8 flex">
        <div className="flex flex-row gap-4">
          <div className="w-12 h-12 bg-black rounded-full"></div>
          <div className="flex flex-col">
            <p className="font-semibold">{userName}</p>
            <p className="text-sm text-gray-600">{userEmail}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl mt-8">
        <div className="flex flex-row items-center gap-5 p-3 px-8 active:bg-gray-300 active:rounded-t-xl cursor-pointer">
          <FiHeart color={thingsColor} size="22" />
          <p className="font-medium">Favorites</p>
        </div>
        <hr />
        <button className="w-full flex flex-row items-center gap-5 p-3 px-8 active:bg-gray-300 active:rounded-b-xl cursor-pointer">
          <FiStar color={thingsColor} size="22" />
          <p className="font-medium">Stared messages</p>
        </button>
      </div>
      <div className="bg-white rounded-xl mt-8">
        <div className="flex flex-row items-center gap-5 p-3 px-8 active:bg-gray-300 active:rounded-t-xl cursor-pointer">
          <VscKey color={thingsColor} size="22" />
          <p className="font-medium">Account</p>
        </div>
        <hr />
        <button className="w-full flex flex-row items-center gap-5 p-3 px-8 active:bg-gray-300 cursor-pointer">
          <FiLock color={thingsColor} size="22" />
          <p className="font-medium">Privacy</p>
        </button>
        <hr />
        <button className="w-full flex flex-row items-center gap-5 p-3 px-8 active:bg-gray-300 cursor-pointer">
          <IoChatbubblesOutline color={thingsColor} size="22" />
          <p className="font-medium">Chats</p>
        </button>
        <hr />
        <button className="w-full flex flex-row items-center gap-5 p-3 px-8 active:bg-gray-300 active:rounded-b-xl cursor-pointer">
          <PiNotificationFill color={thingsColor} size="22" />
          <p className="font-medium">Notifications</p>
        </button>
      </div>
      <div className="bg-white rounded-xl mt-8">
        <div className="flex flex-row items-center gap-5 p-3 px-8 active:bg-gray-300 active:rounded-xl cursor-pointer">
          <FiHelpCircle color={thingsColor} size="22" />
          <p className="font-medium">Help</p>
        </div>
      </div>
    </div>
  );
};
