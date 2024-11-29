/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "../components/AuthenticationForms/AuthenticationForm.css";

export const ImageUpload = ({
  name,
  onInput,
  editImageUploaded = null,
  numOfImages,
  errorText = "Invalid image.",
}) => {
  const filePickerRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isValid, setIsValid] = useState(!!editImageUploaded);

  // Display image preview when a file is selected
  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    } else if (editImageUploaded) {
      // If there is an existing image, set the preview URL to the API URL
      setPreviewUrl(
        `http://localhost:3000/uploads/images/${editImageUploaded}`
      );
    } else {
      setPreviewUrl(null); // Reset if no image is provided
    }
  }, [file, editImageUploaded]);

  // Opens the file picker dialog
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  // Handles file selection
  const pickedHandler = (event) => {
    let pickedFile = null;
    let fileIsValid = false;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setFile(null);
      setPreviewUrl(null);
      setIsValid(false);
    }

    onInput(name, pickedFile, fileIsValid); // Callback to parent
  };

  // Clears the selected file
  const clearImageHandler = () => {
    setFile(null);
    setPreviewUrl(null);
    setIsValid(false);

    onInput(name, null, false); // Clear callback to parent
  };

  return (
    <div className="img-input p-4 flex flex-col items-center w-full">
      {/* Hidden File Input */}
      <input
        type="file"
        className={`hidden Input items-center`}
        id={name}
        name={name}
        ref={filePickerRef}
        accept=".jpg,.jpeg,.png"
        onChange={pickedHandler}
      />

      {/* Image Preview and Controls */}
      <div
        className={`flex flex-col gap-${numOfImages} items-center h-full w-full align-center`}
      >
        {/* Preview Box */}
        <button
          type="button"
          onClick={pickImageHandler}
          className="w-[90%] h-[60%] "
        >
          <div className="m-auto w-full h-full flex items-center justify-center rounded bg-gray-100 border-2 border-dashed border-gray-300">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="rounded w-full h-full object-cover"
              />
            ) : (
              <div className=" w-full h-full flex items-center justify-center text-center text-gray-400">
                Please Pick an Image.
              </div>
            )}
          </div>
        </button>

        {/* Buttons */}
        <div className="w-full flex flex-col items-center">
          <button
            type="button"
            onClick={pickImageHandler}
            className="secondary-btn-sm"
          >
            Choose a File
          </button>

          <button
            type="button"
            onClick={clearImageHandler}
            className="danger-btn-sm"
            disabled={!previewUrl}
          >
            Clear
          </button>

          {/* Error Message */}
          {!isValid && <p className="text-red-500 text-sm mb-0">{errorText}</p>}
        </div>
      </div>
    </div>
  );
};
