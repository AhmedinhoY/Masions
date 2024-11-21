/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { Modal } from "../Modal"
import { Button } from "../Button";


export const ErrorModal = forwardRef(function ErrorModal({ error, onClear }, ref) {


  return (

    // we faced a very cool error
    // the modal renders, then when pressed okay , the modal footer stays on the screen
    // the solution was to add css Stylings based on the error
    // if error :
      // generate styles
    // else : 
      // remove css styles
    // this way we solve the error - very cool :)


    <>
      <Modal
        ref={ref}
        title={'An Error Occurred'}
        className={` ${!error ? '' : 'px-6 py-2 flex flex-col gap-2 rounded-md'}  `}
        contentClass={`${!error ? '' : ' min-h-[40px] w-full '}`}
        titleClass={`${!error ? '' : ' uppercase font-bold '}`}
        footerClass={`${!error ? '' : 'w-full flex items-center justify-end my-2'}`}
        footer={
          <Button inverse onClick={onClear}> Okay </Button>
        }
      >
        <p> {error}</p>
      </Modal>
    </>
  );

})

