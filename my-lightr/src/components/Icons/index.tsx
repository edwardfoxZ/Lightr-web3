import React from "react";
import { IoAddCircle, IoClose } from "react-icons/io5";
import { thingsColor } from "../index/index.tsx";

// Define TypeScript types for the props
interface CloseIconProps {
  onClick: () => void;
}

export const AddIcon: React.FC = () => {
  return <IoAddCircle color={thingsColor} size={33} />;
};

export const CloseIcon: React.FC<CloseIconProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-300 rounded-full font-bold p-[1.2px] absolute right-5"
    >
      <IoClose color={thingsColor} size={25} />
    </button>
  );
};
