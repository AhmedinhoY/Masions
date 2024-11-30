import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useDialog } from "../shared/context/dialog-context"; // Import the useDialog hook
import styles from "./AlertDialog.module.css";

const Alert = () => {
  const { isOpen, closeDialog, dialogContent } = useDialog(); // Get dialog state and content

  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={closeDialog}
      className={styles.Root}
    >
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.Overlay} />
        <AlertDialog.Content className={styles.Content}>
          <AlertDialog.Title className={styles.Title}>
            {dialogContent.title}
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.Description}>
            {dialogContent.description}
          </AlertDialog.Description>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <AlertDialog.Cancel asChild>
              <button className={`secondary-btn-sm !w-fit !mt-4 !text-sm`}>
                {dialogContent.cancelText}
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className={`primary-btn-sm !w-fit !mt-4 !text-sm`}
                onClick={dialogContent.onConfirm}
              >
                {dialogContent.confirmText}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Alert;
