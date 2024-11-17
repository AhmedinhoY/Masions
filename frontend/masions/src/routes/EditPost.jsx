/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router-dom";
import { AddPostForm } from "../components/AddPostForm/AddPostForm";
import { Input } from "../shared/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../shared/util/validators";
import { Button } from "../shared/Button";
import { useForm } from "../shared/hooks/useForm";
import { useEffect, useRef, useState } from "react";
import { useHttp } from "../shared/hooks/useHttp";
import { ErrorModal } from "../shared/UI-Elements/ErrorModal";



export const EditPost = () => {
  // use defer with this later on... 
  const property = useLoaderData();
  const modal = useRef();


  const formCss = "flex flex-col gap-6 items-center bg-white min-w-[50vh] min-h-[50vh] p-2 rounded-md drop-shadow-2xl ";

  const [isLoading, setIsLoading] = useState(true);

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
  }, true);


  const { error, sendRequest, clearError } = useHttp();




  const { inputs } = formState;

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const features = inputs.features.value;
    let featuresList;
    if (typeof features == 'string' ) {
      featuresList = features.split(",").map(f => f.trim());
    } else if (Array.isArray(features) || typeof features == 'object') {
      featuresList = features;
    }

    
    const bedrooms = inputs.bedrooms.value;
    const bathrooms = inputs.bathrooms.value;
    const area = inputs.area.value;
    const price = inputs.price.value;

    const newPlace = {
      city: inputs.city.value,
      type: inputs.type.value,
      propertyStatus: inputs.propertyStatus.value,
      bedrooms: +bedrooms,
      bathrooms: +bathrooms,
      area: +area,
      address: inputs.address.value,
      price: +price,
      features: featuresList,
      description: inputs.description.value,
    }



    try {
      const responseData = await sendRequest(`http://localhost:3000/api/places/${property.id}`,
        'PATCH',
        JSON.stringify(newPlace),
        {
          'Content-Type': 'application/json'
        }
      )

      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  }

  if (error) {
    modal.current.open();
  }





  return (
    <>
      <ErrorModal ref={modal} error={error} onClear={clearError} />
      <main className=" w-full min-h-[70vh] px-8 py-8">
        <h1 className=" drop-shadow-xl rounded-md bg-white w-[150px] text-center px-4 py-2"> Edit Form </h1>
        <div className="w-full min-h-full px-[20rem]">

          <form className={`${formCss} pb-5`} onSubmit={onSubmitForm}>

            <Input
              id="city"
              element="input"
              type="text"
              label="city"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid city."
              onInput={inputHandler}
              defaultValue={formState.inputs.city.value}
              valid={formState.inputs.city.isValid}
            />

            <Input
              elementType={'input'}
              type={'text'}
              label={'type'}
              id={'type'}
              validators={[VALIDATOR_REQUIRE()]}
              errorText={' Please enter a correct type'}
              onInput={inputHandler}
              defaultValue={formState.inputs.type.value}
              valid={formState.inputs.type.isValid}
            />

            <Input
              elementType={'input'}
              type={'text'}
              label={'property Status'}
              id={'propertyStatus'}
              validators={[VALIDATOR_REQUIRE()]}
              errorText={' Please enter a correct property Status'}
              onInput={inputHandler}
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
            <Button type="submit" disabled={!formState.isValid} inverse>
              UPDATE PLACE
            </Button>
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