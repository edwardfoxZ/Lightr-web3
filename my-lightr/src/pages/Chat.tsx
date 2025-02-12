import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

import { useNavigate, useParams } from "react-router-dom";
import { ChatTools } from "../components/utils/ChatTools.tsx";

export const Chat = () => {
  const navigate = useNavigate();
  // const { id } = useParams();
  return (
    <div>
      <nav className="flex flex-row items-center bg-white shadow-md">
        <div className="cursor-pointer" onClick={() => navigate("/chats")}>
          <MdKeyboardArrowLeft size="40" />
        </div>
        <div className="flex w-full items-center justify-between px-3 py-3 sm:px-6 md:px-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-full"></div>
            <div className="flex flex-col">
              <p className="font-semibold text-base">userName</p>
              <span className="text-gray-500 text-xs">
                <p>21/01/2025</p>
              </span>
            </div>
          </div>
        </div>
      </nav>

      <footer className="w-full flex fixed bottom-0">
        <ChatTools />
      </footer>
    </div>
  );
};
