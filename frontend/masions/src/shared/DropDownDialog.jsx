/* eslint-disable no-unused-vars */
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./DropDownDialog.module.css";
import AuthenticationForm from "../components/AuthenticationForms/AuthenticationForm";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useDropDownDialog } from "../shared/context/dropdowndialog-context";

const DropDownDialog = () => {
  const { isOpen, closeDropDownDialog } = useDropDownDialog();
  return (
    <Dialog.Root open={isOpen} onOpenChange={closeDropDownDialog}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <VisuallyHidden.Root>
            <Dialog.Title>Dummy</Dialog.Title>
            <Dialog.Description className={styles.Description}>
              Dummy
            </Dialog.Description>
          </VisuallyHidden.Root>

          <AuthenticationForm closeDialog={closeDropDownDialog} />

          <Dialog.Close asChild>
            <button className={styles.IconButton} aria-label="Close">
              <Cross2Icon style={{ height: "20px", width: "20px" }} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DropDownDialog;
