/* eslint-disable no-unused-vars */
import { useLoaderData, useNavigate } from "react-router-dom";
import { AddPostForm } from "../components/AddPostForm/AddPostForm";
import { Input } from "../shared/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../shared/util/validators";
import { Button } from "../shared/Button";
import { useForm } from "../shared/hooks/useForm";
import { useContext, useEffect, useRef, useState } from "react";
import { useHttp } from "../shared/hooks/useHttp";
import { ErrorModal } from "../shared/UI-Elements/ErrorModal";
import LoadingSpinner from "../shared/UI-Elements/LoadingSpinner";
import { ImageUpload } from "../shared/ImageUpload";
import { AuthContext } from "../shared/context/auth-context";



export const EditPost = () => {
  // use defer with this later on... 
  const property = useLoaderData();
  const modal = useRef();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const formCss = "flex flex-col gap-6 items-center bg-white min-w-[75vh] min-h-[50vh] p-2 rounded-md drop-shadow-2xl ";


  console.log(property);

  // array destructuring ... JS ES6 
  // initial state 
  const [formState, inputHandler, setFormData] = useForm({
    city: {
      value: property.city,
      isValid: true
    },
    type: {
      value: property.type,
      isValid: true
    },
    propertyStatus: {
      value: property.propertyStatus,
      isValid: true
    },

    bedrooms: {
      value: property.bedrooms,
      isValid: true
    },
    bathrooms: {
      value: property.bathrooms,
      isValid: true
    },
    area: {
      value: property.area,
      isValid: true
    },
    address: {
      value: property.address,
      isValid: true
    },
    price: {
      value: property.price,
      isValid: true
    },
    features: {
      value: property.features,
      isValid: true
    },
    description: {
      value: property.description,
      isValid: true
    },
    image0: {
      value: property.img[0].imgSrc,
      isValid: true
    },
    image1: {
      value: property.img[1].imgSrc,
      isValid: true
    },
    image2: {
      value: property.img[2].imgSrc,
      isValid: true
    },
    image3: {
      value: property.img[3].imgSrc,
      isValid: true
    },
  }, true);


  const { error, sendRequest, clearError, isLoading } = useHttp();




  const { inputs } = formState;

  const onSubmitForm = async (e) => {
    e.preventDefault();

    // let featuresList;
    // if (typeof features == 'string') {
    //   featuresList = features.split(",").map(f => f.trim());
    // } else if (Array.isArray(features) || typeof features == 'object') {
    //   featuresList = features;
    // }

    // allow the user to edit the images as well, why not

    // const bedrooms = inputs.bedrooms.value;
    // const bathrooms = inputs.bathrooms.value;
    // const area = inputs.area.value;
    // const price = inputs.price.value;

    // const newPlace = {
    //   city: inputs.city.value,
    //   type: inputs.type.value,
    //   propertyStatus: inputs.propertyStatus.value,
    //   bedrooms: +bedrooms,
    //   bathrooms: +bathrooms,
    //   area: +area,
    //   address: inputs.address.value,
    //   price: +price,
    //   features: features,
    //   description: inputs.description.value,
    // }

    let features = inputs.features.value;
    // const featuresList = features.split(",").map(f => f.trim());
    const bedrooms = inputs.bedrooms.value;
    const bathrooms = inputs.bathrooms.value;
    const area = inputs.area.value;
    const price = inputs.price.value;
    const city = inputs.city.value;
    const type = inputs.type.value;
    const propertyStatus = inputs.propertyStatus.value;
    const address = inputs.address.value;
    const description = inputs.description.value;
    const image0 = inputs.image0.value;
    const image1 = inputs.image1.value;
    const image2 = inputs.image2.value;
    const image3 = inputs.image3.value;


    const formData = new FormData();
    formData.append('city', city);
    formData.append('type', type);
    formData.append('propertyStatus', propertyStatus);
    formData.append('bedrooms', +bedrooms);
    formData.append('bathrooms', +bathrooms);
    formData.append('area', +area);
    formData.append('address', address);
    formData.append('price', +price);
    formData.append('features', features);
    formData.append('description', description);
    formData.append('image0', image0);
    formData.append('image1', image1);
    formData.append('image2', image2);
    formData.append('image3', image3);





    try {
      const responseData = await sendRequest(`http://localhost:3000/api/places/${property.id}`,
        'PATCH',
        formData,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      )
      console.log(responseData);

    } catch (err) {
      console.log(err);
    }
  }

  const onCancelClick = () => {
    navigate(`/${property.id}/post-details`);
  }

  if (error) {
    modal.current.open();
  }





  return (
    <>
      <ErrorModal ref={modal} error={error} onClear={clearError} />
      <main className=" min-w-[75vh] min-h-[70vh] px-8 py-8">
        <h1 className=" drop-shadow-xl rounded-md bg-white w-[150px] text-center px-4 py-2"> Edit Form </h1>
        <div className="w-full min-h-full px-[20rem]">

          <form className={`${formCss} pb-5`} onSubmit={onSubmitForm}>
            {isLoading && <LoadingSpinner asOverlay />}

            <Input
              elementType={"input"}
              type={"text"}
              label={"city"}
              id={"city"}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid city."
              onInput={inputHandler}
              defaultValue={formState.inputs.city.value}
              valid={formState.inputs.city.isValid}
            />


            <Input
              elementType={'select'}
              label={'type'}
              id={'type'}
              validators={[VALIDATOR_REQUIRE()]}
              errorText={' Please select a property type'}
              onInput={inputHandler}
              options={[
                { value: 'house', label: 'House' },
                { value: 'apartment', label: 'Apartment' },
                { value: 'land', label: 'Land' },
              ]}
              defaultValue={formState.inputs.type.value}
              valid={formState.inputs.type.isValid}
            />

            <Input
              elementType={'select'}
              label={'property Status'}
              id={'propertyStatus'}
              validators={[VALIDATOR_REQUIRE()]}
              errorText={' Please select the property status'}
              onInput={inputHandler}
              options={[
                { value: 'sale', label: 'Sale' },
                { value: 'rent', label: 'Rent' },
              ]}
              defaultValue={formState.inputs.propertyStatus.value}
              valid={formState.inputs.propertyStatus.isValid}
            />


            <Input
              elementType={'input'}
              type={'text'}
              label={'bedrooms'}
              id={'bedrooms'}
              validators={[VALIDATOR_REQUIRE()]}
              errorText={' Please enter a number of bedrooms'}
              onInput={inputHandler}
              defaultValue={formState.inputs.bedrooms.value}
              valid={formState.inputs.bedrooms.isValid}
            />


            <Input
              elementType={'input'}
              type={'text'}
              label={'bathrooms'}
              id={'bathrooms'}
              validators={[VALIDATOR_REQUIRE()]}
              errorText={' Please enter a number of bathrooms'}
              onInput={inputHandler}
              defaultValue={formState.inputs.bathrooms.value}
              valid={formState.inputs.bathrooms.isValid}
            />

            <Input
              elementType={'input'}
              type={'text'}
              label={'area'}
              id={'area'}
              validators={[VALIDATOR_REQUIRE()]}
              errorText={' Please enter the area of the property'}
              onInput={inputHandler}
              defaultValue={formState.inputs.area.value}
              valid={formState.inputs.area.isValid}
            />

            <Input
              elementType={'input'}
              type={'text'}
              label={'address'}
              id={'address'}
              validators={[VALIDATOR_REQUIRE()]}
              errorText={' Please enter correct address'}
              onInput={inputHandler}
              defaultValue={formState.inputs.address.value}
              valid={formState.inputs.address.isValid}
            />

            <Input
              elementType={'input'}
              type={'text'}
              label={'price'}
              id={'price'}
              validators={[VALIDATOR_REQUIRE()]}
              errorText={' please enter a number '}
              onInput={inputHandler}
              defaultValue={formState.inputs.price.value}
              valid={formState.inputs.price.isValid}
            />

            <Input
              elementType={'input'}
              type={'text'}
              label={'features'}
              id={'features'}
              validators={[VALIDATOR_REQUIRE()]}
              placeholder={"Enter Features separated by commas (e.g., Garden, Garage, Swimming Pool )"}
              errorText={' Please the features separated by coma\'s {e.g. Swimming Pool, Wi-fi, Library, etc.} '}
              onInput={inputHandler}
              defaultValue={formState.inputs.features.value}
              valid={formState.inputs.features.isValid}
            />

            <Input
              id="description"
              element="textarea"
              label="description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description (min. 5 characters)."
              onInput={inputHandler}
              defaultValue={formState.inputs.description.value}
              valid={formState.inputs.description.isValid}
            />

            <div className="flex w-full h-full items-center justify-center gap-2 ">
              {/* add the logic needed here and in the backend to handle the imageUpload */}
              <ImageUpload name={'image0'} onInput={inputHandler} editImageUploaded={formState.inputs.image0.value} /> 
              <ImageUpload name={'image1'} onInput={inputHandler} editImageUploaded={formState.inputs.image1.value} />
              <ImageUpload name={'image2'} onInput={inputHandler} editImageUploaded={formState.inputs.image2.value} />
              <ImageUpload name={'image3'} onInput={inputHandler} editImageUploaded={formState.inputs.image3.value} />

            </div>

            <div className="flex w-full items-center justify-end px-8 pt-8 gap-3">

              <Button type="button" onClick={onCancelClick}  >
                Cancel
              </Button>

              <Button type="submit" disabled={!formState.isValid} inverse>
                UPDATE PLACE
              </Button>

            </div>

          </form>

        </div>
      </main>
    </>
  );
}



// this page is only accessed if: 
// user.id == creator id of the post 
// if user.id != creator id --> send him back to the homePage



// using react-router-dom

// return (
//   <>
//     <main className=" w-full min-h-[70vh] bg-blue-gray-300 px-8 py-8">
//       <h1> Edit Form </h1>
//       <div className="w-full min-h-full px-[20rem]">
//         <AddPostForm method={'patch'} property={property} />
//       </div>
//     </main>
//   </>
// );