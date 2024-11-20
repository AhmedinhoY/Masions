/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";

export const ImageUpload = (props, { name, extraClasses, pClass }) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isVaild, setIsValid] = useState(false);

  let databaseImage = props.editImageUploaded;

  let imageUploadClearDisabled = !!previewUrl || !!databaseImage;

  // to display the preview image
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    }
    fileReader.readAsDataURL(file);
  }, [file]);


  // opens the pick image thing on the user os system
  const pickImageHandler = () => {
    filePickerRef.current.click();
  }

  // getting the picked file 
  const pickedHandler = event => {
    let pickedFile;
    // react will execute the state functions after seeing all the code inside the function
    // therefore we need to set it manually by using 'fileIsValid'
    let fileIsValid = isVaild;
    if (event.target.files && event.target.files.length === 1) {
      // pick only the 1st file that is uploaded
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      setFile(null);
      setPreviewUrl(null);
      pickedFile = null;
      fileIsValid = false;
    }
    props.onInput(props.name, pickedFile, fileIsValid);

  }

  const ClearImage = () => {
    setIsValid(false);
    setFile(null);
    setPreviewUrl(null);
    let pickedFile = null;
    let fileIsValid = false;
    props.onInput(props.name, pickedFile, fileIsValid);


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
          <div className=" h-[16vh] w-[16vh] border-2 flex items-center justify-center">
            {previewUrl &&
              <img src={previewUrl} className=" h-[16vh] w-[16vh] object-contain" alt="Preview" />}
            {!previewUrl && props.editImageUploaded &&
              <img src={`http://localhost:3000/${props.editImageUploaded}`} className=" h-[16vh] w-[16vh] object-contain" alt="Preview" />}
            {!previewUrl && !props.editImageUploaded && <p className="text-center">Please Pick an Image.</p>}


          </div>
          <button
            type="button"
            onClick={pickImageHandler}
            className="  px-2 py-2 rounded-md text-black text-sm bg-gray-400 hover:bg-gray-700 hover:text-white  "
          >
            Choose a File
          </button>
          <Button
            type={'button'}
            onClick={ClearImage}
            disabled={!imageUploadClearDisabled}
            danger

          >
            Clear
          </Button>
        </div>

        {!isVaild && <p> {props.errorText} </p>}
      </div>


    </>

  );
}