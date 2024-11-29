/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const DropDownDialogContext = createContext();
const SellerReqDialogContext = createContext();

export const useDropDownDialog = () => {
  return useContext(DropDownDialogContext);
};
export const useSellerReqDialog = () => {
  return useContext(SellerReqDialogContext);
};

export const DropDownDialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDropDownDialog = () => {
    setIsOpen(true);
  };

  const closeDropDownDialog = () => {
    setIsOpen(false);
  };

  return (
    <DropDownDialogContext.Provider
      value={{ isOpen, openDropDownDialog, closeDropDownDialog }}
    >
      {children}
    </DropDownDialogContext.Provider>
  );
};
export const SellerReqDialogProvider = ({ children }) => {
  const [isSellerReqOpen, setIsSellerReqOpen] = useState(false);

  const openSellerReqDialog = () => {
    setIsSellerReqOpen(true);
  };

  const closeSellerReqDialog = () => {
    setIsSellerReqOpen(false);
  };

  return (
    <SellerReqDialogContext.Provider
      value={{ isSellerReqOpen, openSellerReqDialog, closeSellerReqDialog }}
    >
      {children}
    </SellerReqDialogContext.Provider>
  );
};
