import React from "react";
import { IoCallOutline, IoCall } from "react-icons/io5";
import { RiSettings2Line, RiSettings2Fill } from "react-icons/ri";
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi2";
import { IoChatbubblesOutline, IoChatbubblesSharp } from "react-icons/io5";
import { GoPerson, GoPersonFill } from "react-icons/go";
import { thingsColor } from "../index/index.tsx";
import { Link, useLocation } from "react-router-dom";

export const Footer = () => {
  let sizeOfIcons = "29";

  const location = useLocation();

  return (
    <footer className="Footer w-full fixed bottom-0 px-6 py-4">
      <div className="flex flex-row justify-center gap-36 max-sm:gap-9 md:gap-14">
        <Link className="flex flex-col items-center" to="/calls" role="button">
          {location.pathname === "/calls" ? (
            <IoCall color={thingsColor} size={sizeOfIcons} />
          ) : (
            <IoCallOutline color={thingsColor} size={sizeOfIcons} />
          )}
          <p className="text-xs font-medium">Calls</p>
        </Link>
        <Link
          className="flex flex-col items-center"
          to="/friends"
          role="button"
        >
          {location.pathname === "/friends" ? (
            <GoPersonFill color={thingsColor} size={sizeOfIcons} />
          ) : (
            <GoPerson color={thingsColor} size={sizeOfIcons} />
          )}
          <p className="text-xs font-medium">Friends</p>
        </Link>
        <Link
          className="flex flex-col items-center"
          to="/community"
          role="button"
        >
          {location.pathname === "/community" ? (
            <HiUserGroup color={thingsColor} size={sizeOfIcons} />
          ) : (
            <HiOutlineUserGroup color={thingsColor} size={sizeOfIcons} />
          )}
          <p className="text-xs font-medium">Communities</p>
        </Link>
        <Link className="flex flex-col items-center" to="/chats" role="button">
          {location.pathname === "/" || location.pathname === "/chats" ? (
            <IoChatbubblesSharp color={thingsColor} size={sizeOfIcons} />
          ) : (
            <IoChatbubblesOutline color={thingsColor} size={sizeOfIcons} />
          )}
          <p className="text-xs font-medium">Chats</p>
        </Link>
        <Link
          className="flex flex-col items-center"
          to="/settings"
          role="button"
        >
          {location.pathname === "/settings" ? (
            <RiSettings2Fill color={thingsColor} size={sizeOfIcons} />
          ) : (
            <RiSettings2Line color={thingsColor} size={sizeOfIcons} />
          )}
          <p className="text-xs font-medium">Settings</p>
        </Link>
      </div>
    </footer>
  );
};
