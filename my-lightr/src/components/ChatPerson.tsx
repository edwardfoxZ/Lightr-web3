import React from "react";
import { useNavigate } from "react-router-dom";

export const ChatPerson = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/chats/chat1")}
      className="ChatPerson mt-6 flex flex-col w-full active:bg-gray-400"
    >
      <div className="flex w-full items-center justify-between px-8 py-3 sm:px-6 md:px-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-black rounded-full"></div>
          <div className="flex flex-col">
            <p className="font-semibold text-base">userName</p>
            <p className="text-sm text-gray-600">status</p>
          </div>
        </div>
        <div className="text-gray-500 text-xs">
          <p>21/01/2025</p>
        </div>
      </div>
      <hr className="w-9/12 ml-auto" />
    </div>
  );
};
