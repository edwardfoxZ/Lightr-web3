import React, { useState } from "react";
import { Nav } from "../components/Nav.tsx";
import { NewChat } from "../components/NewChat.tsx";
import { SearchInput } from "../components/utils/SearchInput.tsx";
import { Titles } from "../components/utils/Titles.tsx";
import { useHandleShowCancel } from "../components/hooks/useShowCancel.ts";
import { ChatPerson } from "../components/ChatPerson.tsx";

export const Main = () => {
  const [isPopUp, setPopUp] = useState(false);
  const { handleInputClick, handleShowCancelBu, isShowCancel } =
    useHandleShowCancel();

  const handlePopUp = () => {
    setPopUp(!isPopUp);
  };

  return (
    <div className="Main w-full h-full">
      <Nav onClick={handlePopUp} isVisible={isShowCancel} />

      <div
        className={`fixed z-20 inset-0 transform transition-all duration-500 ease-linear ${
          isPopUp ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <NewChat handlePopDown={handlePopUp} isVisible={isPopUp} />
      </div>
      <header
        className={`${
          isShowCancel ? "-translate-y-14" : ""
        } transition-transform`}
      >
        <div className="px-5 transition-transform">
          <Titles title="Chats" />
          <div className="mt-1">
            <SearchInput
              onCancelClick={handleShowCancelBu}
              isShowCancel={isShowCancel}
              onInputClick={handleInputClick}
              placeHolder="Search"
            />
          </div>
        </div>
        <div className="Chats cursor-pointer">
          <ChatPerson id={1} />
        </div>
      </header>
    </div>
  );
};
