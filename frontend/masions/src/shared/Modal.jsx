/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';




export const Modal = forwardRef(function Modal({ children, buttonText }, ref) {

  const dialog = useRef();

  useImperativeHandle(ref , ()=>{
    return{
      open(){
        dialog.current.showModal();
      }
    }
  });

  return createPortal(
    <>
      <dialog
       ref={dialog}
       >
        {children}

        <form method="dialog">
          <button>
            {buttonText}
          </button>
        </form>

      </dialog>
    </>,
    document.getElementById('modal-root')
  );
});