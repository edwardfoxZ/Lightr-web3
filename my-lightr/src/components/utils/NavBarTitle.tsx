import React, { useEffect, useState } from "react";

export const NavBarTitle = ({ titleBar }) => {
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
    <div
      className={`Nav-title w-full flex ${
        isScrolled
          ? "fixed py-3 top-0 font-semibold bg-slate-200 shadow-lg"
          : "fixed py-3 top-0"
      } transition-all`}
    >
      {isScrolled && (
        <div className="flex mx-auto">
          <p>{titleBar}</p>
        </div>
      )}
    </div>
  );
};
