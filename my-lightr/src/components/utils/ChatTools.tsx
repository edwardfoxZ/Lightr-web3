import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { BsEmojiSmile, BsSend } from "react-icons/bs";
import { thingsColor } from "../index/index.tsx";

export const ChatTools = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="w-full flex flex-row content-center items-center pb-3 pt-2 border-t">
      <button className="px-3 lg:ml-[39%]">
        <IoAddOutline size="28" color={thingsColor} />
      </button>

      <button className="rounded-full hover:bg-gray-200">
        <BsEmojiSmile size="20" color={thingsColor} />
      </button>

      <div className="w-full px-3 flex">
        <textarea
          className="w-72 min-h-[40px] max-h-[120px] rounded-full px-4 py-2 border outline-none bg-gray-100 resize-none"
          placeholder="Type a message"
          rows="1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {message.trim() && (
        <button className="rounded-full hover:bg-gray-200 text-blue-500 pr-5 mr-[39%]">
          <BsSend size="20" />
        </button>
      )}
    </div>
  );
};
