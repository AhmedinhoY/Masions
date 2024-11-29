/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const DialogContext = createContext();

export const useDialog = () => {
  return useContext(DialogContext);
};

export const DialogProvider = ({ children }) => {
  const [dialogContent, setDialogContent] = useState({
    title: "Are you sure?",
    description: "This action cannot be undone.",
    confirmText: "Yes, proceed",
    cancelText: "Cancel",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const setDialog = (content) => {
    setDialogContent(content);
  };

  return (
    <DialogContext.Provider value={{ dialogContent, setDialog }}>
      {children}
    </DialogContext.Provider>
  );
};
