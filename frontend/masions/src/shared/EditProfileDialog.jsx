/* eslint-disable no-unused-vars */
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./DropDownDialog.module.css";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useEditProfileDialog } from "../shared/context/dropdowndialog-context";
import EditProfileForm from "../components/AuthenticationForms/EditProfileForm";

const EditProfileDialog = () => {
  const { isEditProfileOpen, closeEditProfileDialog } = useEditProfileDialog();
  console.log("Dialog open state:", isEditProfileOpen);

  return (
    <Dialog.Root open={isEditProfileOpen} onOpenChange={closeEditProfileDialog}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={`${styles.Content}`}>
          <Dialog.Title className={`!mb-4`}>Request Form</Dialog.Title>
          <VisuallyHidden.Root>
            <Dialog.Description className={styles.Description}>
              Dummy
            </Dialog.Description>
          </VisuallyHidden.Root>

          <EditProfileForm closeDialog={closeEditProfileDialog} />

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

export default EditProfileDialog;
