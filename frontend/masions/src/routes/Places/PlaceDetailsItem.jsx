/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useSubmit } from "react-router-dom";
import { Modal } from "../../shared/Modal";
import { useRef, useState } from "react";

export const PlaceDetailsItem = ({ place }) => {
  const submit = useSubmit();
  const titleCss = " font-bold uppercase text-stone-500";
  const modal = useRef();

  // we can make use of redux here ....
  const [isConfirmed, setIsConfirmed] = useState(false);

  const onDeleteClick = () => {
    // it's like submitting a form
    // very cool and wonderful
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      submit(null, { method: "delete" });
      console.log("deleted");
    }
  };

  return (
    <>
      <Modal ref={modal} buttonText={"Yes"}>
        <h1> Are you sure you want to proceed? </h1>
        <button> Cancel </button>
        <button> Yes</button>
      </Modal>

      <article
        className={
          "bg-stone-50 flex flex-col gap-2 p-8 drop-shadow-2xl rounded-xl"
        }
      >
        <img
          className=" w-[60vh] object-contain rounded-md"
          src={place.image}
          alt={place.title}
        />
        <h1 className={titleCss}>{place.title}</h1>

        <p className="font-serif capitalize">{place.description}</p>

        <menu className="  flex justify-end  gap-3 items-center">
          <Link
            to="edit"
            className=" px-6 py-2 rounded-md text-stone-800 hover:bg-stone-200"
          >
            Edit
          </Link>

          <button
            className=" px-6 py-2 rounded-md text-stone-50 bg-stone-600 hover:bg-stone-500 "
            onClick={onDeleteClick}
          >
            Delete
          </button>
        </menu>
      </article>
    </>
  );
};
