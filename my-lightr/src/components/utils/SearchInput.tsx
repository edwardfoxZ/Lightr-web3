import React from "react";
import { IoSearch } from "react-icons/io5";

export const SearchInput = ({
  onInputClick,
  onCancelClick,
  isShowCancel,
  placeHolder,
}) => {
  return (
    <div className="w-full flex flex-row justify-center items-center gap-2">
      <form className="w-full relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <IoSearch size="20" />
        </span>
        <input
          onClick={onInputClick}
          className="bg-gray-200 pl-10 pr-3 py-1 rounded-xl w-full placeholder:text-sm placeholder:font-medium font-semibold focus:outline-none"
          placeholder={placeHolder}
        />
      </form>
      {isShowCancel && (
        <div onClick={onCancelClick} className="flex cursor-pointer">
          <p className="text-gray-600 font-semibold">Cancel</p>
        </div>
      )}
    </div>
  );
};
