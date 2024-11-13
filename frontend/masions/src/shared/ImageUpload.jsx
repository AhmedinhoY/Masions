/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

export const ImageUpload = ({ name, extraClasses, pClass }) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    }
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  }

  const pickedHandler = event => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
  }


  return (
    <>
      <div className={pClass}>
        <input
          type="file"
          className={` ${extraClasses} hidden`}
          name={name}
          id={name}
          ref={filePickerRef}
          accept=".jpg,.jpeg,.png"
          onChange={pickedHandler}
        />

        <div className=" flex flex-col gap-3 justify-center items-center">
          <div className=" h-[27vh] w-[27vh] border-2">
            {previewUrl && <img src={previewUrl} className=" h-[27vh] w-[27vh] object-contain" alt="Preview" />}
            {!previewUrl && <p>Please Pick an Image.</p>}


          </div>
          <button
            type="button"
            onClick={pickImageHandler}
            className="  px-6 py-2 rounded-md text-black bg-gray-400 hover:bg-gray-700 hover:text-white  "
          >
            Choose a File
          </button>
        </div>
      </div>


    </>

  );
}