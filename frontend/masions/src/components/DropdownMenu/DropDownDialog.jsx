import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./DropDownDialog.module.css";
import AuthenticationForm from "../AuthenticationForms/AuthenticationForm";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const DropDownDialog = ({ open, onOpenChange }) => (
  // { open, onOpenChange } are props passed when login item is clicked to open the modal/dialog
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.Overlay} />
      <Dialog.Content className={styles.Content}>
        <VisuallyHidden.Root>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description className={styles.Description}>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
        </VisuallyHidden.Root>

        <AuthenticationForm />

        <Dialog.Close asChild>
          <button className={styles.IconButton} aria-label="Close">
            <Cross2Icon style={{ height: "20px", width: "20px" }} />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DropDownDialog;
