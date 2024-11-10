/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Form, useNavigate, useNavigation } from "react-router-dom";
export const NewPlaceForm = ({ method, place }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const onCancelClick = () => {
    // this will go to the parnet path
    // so make sure that the parnet the newPlace page is the Places Page
    navigate("..");
  };

  // HERE we use let because we will add some styling to it
  // making the styles added to this project more adaptable to changes
  let inputCss =
    " p-1 border-b-[2px] rounded-sm border-stone-400 text-stone-600 bg-stone-200 focus:outline-none focus:border-stone-600 ";
  const pCss = " flex flex-col gap-1 min-w-full px-4 py-2";
  const labelCss = "text-sm font-bold uppercase text-stone-500";

  // checking the state of the navigation - powerful react router feature
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <Form
        className="flex flex-col gap-6 items-center bg-white min-w-[50vh] min-h-[50vh] p-2 rounded-md drop-shadow-2xl"
        method={method}
      >
        <p className={pCss}>
          <label htmlFor="title" className={labelCss}>
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            required
            className={inputCss}
            defaultValue={place ? place.title : ""}
          />
        </p>

        <p className={pCss}>
          <label htmlFor="description" className={labelCss}>
            {" "}
            Description
          </label>
          <textarea
            type="textarea"
            id="description"
            name="description"
            required
            className={inputCss + " h-[10vh]"}
            defaultValue={place ? place.description : ""}
          />
        </p>

        <p className={pCss}>
          <label htmlFor="address" className={labelCss}>
            {" "}
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            className={inputCss}
            defaultValue={place ? place.address : ""}
          />
        </p>

        <p className={pCss}>
          <label htmlFor="image" className={labelCss}>
            {" "}
            Image
          </label>
          <input
            type="text"
            id="image"
            name="image"
            required
            className={inputCss}
          />
        </p>

        <div className=" w-full flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancelClick}
            className=" px-6 py-2 rounded-md text-stone-800 hover:bg-stone-200"
          >
            Cancel
          </button>
          <button
            className={` px-6 py-2 rounded-md text-stone-50  ${
              isSubmitting ? " bg-stone-400" : "bg-stone-950 hover:bg-stone-700"
            }`}
            disabled={isSubmitting}
          >
            {" "}
            {isSubmitting ? "Submitting..." : "Add"}{" "}
          </button>
        </div>
      </Form>
    </>
  );
};

// things to add to this page:

// - maybe make this form in Radix
// - add frontend validation
// - enable the user to chose the location on the map directly
