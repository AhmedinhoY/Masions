/* eslint-disable no-case-declarations */
import { Input } from "../../shared/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { Button } from "../../shared/Button";
import { useForm } from "../../shared/hooks/useForm";
import { useHttp } from "../../shared/hooks/useHttp";
import { useContext, useRef } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { ErrorModal } from "../../shared/UI-Elements/ErrorModal";
import { ImageUpload } from "../../shared/ImageUpload";
import LoadingSpinner from '../../shared/UI-Elements/LoadingSpinner.jsx';
import { useNavigate } from "react-router-dom";


export const AddForm = () => {

  const auth = useContext(AuthContext);
  const modal = useRef();
  const [formState, inputHandler] = useForm({
    city: {
      value: '',
      isValid: false
    },
    type: {
      value: '',
      isValid: false
    },
    propertyStatus: {
      value: '',
      isValid: false
    },

    bedrooms: {
      value: '',
      isValid: false
    },
    bathrooms: {
      value: '',
      isValid: false
    },
    area: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    },
    price: {
      value: '',
      isValid: false
    },
    features: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    image0: {
      value: null,
      isValid: false
    },
    image1: {
      value: null,
      isValid: false
    },
    image2: {
      value: null,
      isValid: false
    },
    image3: {
      value: null,
      isValid: false
    },
  }, false);

  const { error, sendRequest, clearError, isLoading } = useHttp();




  const { inputs } = formState;

  const handleSubmission = async (event) => {
    event.preventDefault();

    let features = inputs.features.value;
    const featuresList = features.split(",").map(f => f.trim());
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


    // const newPlace = {
    //   city: inputs.city.value,
    //   type: inputs.type.value,
    //   propertyStatus: inputs.propertyStatus.value,
    //   bedrooms: +bedrooms,
    //   bathrooms: +bathrooms,
    //   area: +area,
    //   address: inputs.address.value,
    //   price: +price,
    //   features: featuresList,
    //   description: inputs.description.value,
    //   creator: auth.uid,
    // }

    const formData = new FormData();
    formData.append('city', city);
    formData.append('type', type);
    formData.append('propertyStatus', propertyStatus);
    formData.append('bedrooms', +bedrooms);
    formData.append('bathrooms', +bathrooms);
    formData.append('area', +area);
    formData.append('address', address);
    formData.append('price', +price);
    formData.append('features', featuresList);
    formData.append('description', description);
    formData.append('image0', image0);
    formData.append('image1', image1);
    formData.append('image2', image2);
    formData.append('image3', image3);


    console.log(image0);
    console.log(featuresList);

    try {
      // create a place
      const responseData = await sendRequest('http://localhost:3000/api/places/',
        'POST',
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

  const navigate = useNavigate();
  const onCancelClick = () => {
    navigate(`/`);
  }

  if (error) {
    modal.current.open();
  }




  return (
    <>
      <ErrorModal ref={modal} onClear={clearError} error={error} />
      <form
        className={`flex flex-col gap-6  bg-white min-w-[75vh] min-h-[50vh] p-2 
      rounded-md drop-shadow-2xl`}
        onSubmit={handleSubmission}
      >
        {isLoading && <LoadingSpinner asOverlay />}



        <Input
          elementType={'input'}
          type={'text'}
          label={'city'}
          id={'city'}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={' Please enter a correct city'}
          onInput={inputHandler}
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
        />


        <Input
          elementType={'input'}
          type={'text'}
          label={'bedrooms'}
          id={'bedrooms'}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={' Please enter a number of bedrooms'}
          onInput={inputHandler}
        />


        <Input
          elementType={'input'}
          type={'text'}
          label={'bathrooms'}
          id={'bathrooms'}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={' Please enter a number of bathrooms'}
          onInput={inputHandler}
        />
        <Input
          elementType={'input'}
          type={'text'}
          label={'area'}
          id={'area'}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={' Please enter the area of the property'}
          onInput={inputHandler}
        />
        <Input
          elementType={'input'}
          type={'text'}
          label={'address'}
          id={'address'}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={' Please enter correct address'}
          onInput={inputHandler}
        />
        <Input
          elementType={'input'}
          type={'text'}
          label={'price'}
          id={'price'}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={' please enter a number '}
          onInput={inputHandler}
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
        />

        <Input
          label={'description'}
          id={'description'}
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText={' Please enter at least 5 characters'}
          onInput={inputHandler}
        />
        <div className="flex w-full h-full items-center justify-center gap-2 ">
          {/* add the logic needed here and in the backend to handle the imageUpload */}
          <ImageUpload name={'image0'} onInput={inputHandler} />
          <ImageUpload name={'image1'} onInput={inputHandler} />
          <ImageUpload name={'image2'} onInput={inputHandler} />
          <ImageUpload name={'image3'} onInput={inputHandler} />

        </div>


        <div className=" w-full  flex items-start justify-end px-4 gap-3">

          <Button type="button" onClick={onCancelClick}  >
            Cancel
          </Button>

          <Button
            type={'submit'}
            disabled={!formState.isValid}
            inverse
          >
            Add Post
          </Button>
        </div>

      </form>
    </>
  );
}