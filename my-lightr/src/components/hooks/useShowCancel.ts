import React, { useState } from "react";

// Define the return type of the hook
interface UseHandleShowCancelReturn {
  isShowCancel: boolean;
  setShowCancel: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputClick: () => void;
  handleShowCancelBu: () => void;
}

export const useHandleShowCancel = (): UseHandleShowCancelReturn => {
  const [isShowCancel, setShowCancel] = useState<boolean>(false);

  const handleShowCancelBu = () => {
    setShowCancel(false);
  };

  const handleInputClick = () => {
    setShowCancel(true);
  };

  return { isShowCancel, setShowCancel, handleInputClick, handleShowCancelBu };
};
