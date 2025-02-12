import React, { useEffect, useState } from "react";
import { AddIcon } from "./Icons/index.tsx";
import { useLocation } from "react-router-dom";

export const Nav = ({ onClick, isVisible }) => {
  const location = useLocation();

  const [isScrolled, setScroll] = useState(false);

  useEffect(() => {
    const handleScrolling = () => {
      if (window.scrollY >= 26) {
        setScroll(!isScrolled);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScrolling);

    return () => {
      window.removeEventListener("scroll", handleScrolling);
    };
  }, []);

  return (
    <>
      <div
        className={`w-full fixed top-0 px-2 py-2 flex items-center ${
          isVisible ? "opacity-0" : "opacity-100 -z-0"
        } transition-opacity duration-300`}
      >
        {location.pathname === "/chats" && (
          <span className="ml-auto" onClick={onClick}>
            <AddIcon />
          </span>
        )}
      </div>
    </>
  );
};
