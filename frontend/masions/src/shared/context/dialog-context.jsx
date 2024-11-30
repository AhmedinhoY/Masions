/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const DialogContext = createContext();

export const useDialog = () => {
  return useContext(DialogContext);
};

export const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // State for dialog open/close
  const [dialogContent, setDialogContent] = useState({
    title: "Are you sure?",
    description: "This action cannot be undone.",
    confirmText: "Yes, proceed",
    cancelText: "Cancel",
    onConfirm: () => {},
    onCancel: () => {},
  });

  // Function to open the dialog with custom content
  const openDialog = (content) => {
    setDialogContent(content);
    setIsOpen(true);
  };

  // Function to close the dialog
  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <DialogContext.Provider
      value={{ isOpen, openDialog, closeDialog, dialogContent }}
    >
      {children}
    </DialogContext.Provider>
  );
};
