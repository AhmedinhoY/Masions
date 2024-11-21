/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';


export const Modal =forwardRef(function ModalOverlay(
  {
    className,
    titleClass,
    title,
    onSubmit,
    contentClass,
    footerClass,
    footer,
    children

  },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },

      close() {
        dialog.current.close();
      }
    }
  });

  const content = (
    <>
      <dialog
        ref={dialog}
        className={`${className} `}
      >
        <header className={`${titleClass} `}>
          <h2> {title} </h2>
        </header>

        <form
          method="dialog"
        >
          <div className={`${contentClass}`}>
            {children}
          </div>

          <footer className={`${footerClass} `}>
            {footer}
            {/* add a button of type submit here and it should close the modal */}
          </footer>
          
        </form>

      </dialog>
    </>
  );

  return createPortal(
    content,
    document.getElementById('modal-root')
  );

});