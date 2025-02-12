import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

export const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [isBgDesktop, setBgDesktop] = useState(false);

  const handleLogInClick = () => {
    handleLogin();
    navigate("/chats");
  };

  useEffect(() => {
    const handleBg = () => {
      if (window.innerWidth > 431) {
        setBgDesktop(true);
      } else {
        setBgDesktop(false);
      }
    };

    window.addEventListener("resize", handleBg);

    return () => {
      window.removeEventListener("resize", handleBg);
    };
  }, []);

  return (
    <div
      className={`w-full h-full relative ${
        isBgDesktop ? "login-p-desktop" : "Login-p"
      }`}
    >
      <div className="absolute top-96 left-40">
        <button
          onClick={handleLogInClick}
          className="bg-[#9f9abe] px-8 py-2 text-md text-white font-medium rounded-xl"
        >
          Log in
        </button>
      </div>
    </div>
  );
};
