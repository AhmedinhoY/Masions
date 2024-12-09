/* eslint-disable react/prop-types */

import { Form, useNavigate, useNavigation } from "react-router-dom";
import { ImageUpload } from "../../shared/ImageUpload";
import { Button } from "../../shared/Button";

export const AddPostForm = ({ method, property }) => {
  const navigation = useNavigation();
  const navigate = useNavigate();

  // HERE we use let because we will add some styling to it
  // making the styles added to this project more adaptable to changes
  let inputCss =
    " p-1 border-b-[2px] rounded-sm border-gray-400 text-gray-600 bg-gray-200 focus:outline-none focus:border-gray-600 ";
  const pCss = " flex flex-col gap-1 min-w-full px-4 py-2";
  const labelCss = "text-sm font-bold uppercase text-gray-800";

  const isSubmitting = navigation.state === "submitting";

  const onCancelClick = () => {
    navigate("/");
  };

  return (
    <>
      <Form
        className="flex flex-col gap-6 items-center bg-white min-w-[50vh] min-h-[50vh] p-2 rounded-md drop-shadow-2xl "
        method={method}
      >
        <p className={pCss}>
          <label htmlFor="city" className={labelCss}>
            city
          </label>
          <input
            id="city"
            type="text"
            name="city"
            required
            className={inputCss}
            defaultValue={property ? property.city : ""}
          />
        </p>

        <p className={pCss}>
          <label htmlFor="type" className={labelCss}>
            type
          </label>
          <select
            id="type"
            name="type"
            required
            className={inputCss + " text-blue-900"}
            defaultValue={property ? property.type : ""}
          >
            <option value=""> Select Type </option>
            <option value="house"> House </option>
            <option value="apartment"> Apartment</option>
            <option value="land"> Land</option>
          </select>
        </p>

        <p className={pCss}>
          <label htmlFor="propertyStatus" className={labelCss}>
            property Status
          </label>
          <select
            id="propertyStatus"
            name="propertyStatus"
            required
            className={inputCss + " text-blue-900"}
            defaultValue={property ? property.propertyStatus : ""}
          >
            <option value=""> Select Property Status </option>
            <option value="sale"> Sale </option>
            <option value="rent"> Rent</option>
          </select>
        </p>

        <p className={pCss}>
          <label htmlFor="bedrooms" className={labelCss}>
            bedrooms
          </label>
          <input
            id="bedrooms"
            type="text"
            name="bedrooms"
            required
            className={inputCss}
            defaultValue={property ? property.bedrooms : ""}
          />
        </p>

        <p className={pCss}>
          <label htmlFor="bathrooms" className={labelCss}>
            bathrooms
          </label>
          <input
            id="bathrooms"
            type="text"
            name="bathrooms"
            required
            className={inputCss}
            defaultValue={property ? property.bathrooms : ""}
          />
        </p>

        <p className={pCss}>
          <label htmlFor="area" className={labelCss}>
            area
          </label>
          <input
            id="area"
            type="text"
            name="area"
            required
            className={inputCss}
            defaultValue={property ? property.area : ""}
          />
        </p>

        <p className={pCss}>
          <label htmlFor="price" className={labelCss}>
            price
          </label>
          <input
            id="price"
            type="text"
            name="price"
            required
            className={inputCss}
            defaultValue={property ? property.price : ""}
          />
        </p>

        <p className={pCss}>
          <label htmlFor="features" className={labelCss}>
            features
          </label>
          <input
            id="features"
            type="text"
            name="features"
            required
            className={inputCss}
            placeholder="Enter Features separated by commas (e.g., Garden, Garage, Swimming Pool )"
            defaultValue={property ? property.features : ""}
          />
          {/* add a small list showing the user how things will look like */}
        </p>

        <p className={pCss}>
          <label htmlFor="description" className={labelCss}>
            Description
          </label>
          <textarea
            type="textarea"
            id="description"
            name="description"
            required
            className={inputCss + " h-[10vh]"}
            defaultValue={property ? property.description : ""}
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
            defaultValue={property ? property.address : ""}
          />
        </p>

        {/* add Image upload */}

        <ImageUpload name={"image"} extraClasses={inputCss} pClass={pCss} />

        <div className=" w-full flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancelClick}
            className=" px-6 py-2 rounded-md text-gray-800 hover:bg-gray-200"
          >
            Cancel
          </button>

          <Button type={"submit"} disabled={isSubmitting} inverse>
            {isSubmitting ? "Submitting..." : "Add"}
          </Button>
        </div>
      </Form>
    </>
  );
};
