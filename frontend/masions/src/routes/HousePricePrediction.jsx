/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import { VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../shared/util/validators";
import { Button } from "../shared/Button";
import { useForm } from "../shared/hooks/useForm";
import { useHttp } from "../shared/hooks/useHttp";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../shared/context/auth-context";
import { ErrorModal } from "../shared/UI-Elements/ErrorModal";
import { ImageUpload } from "../shared/ImageUpload";
import LoadingSpinner from '../shared/UI-Elements/LoadingSpinner.jsx';
import { useNavigate } from "react-router-dom";
import { Input } from "../shared/Input.jsx";



const STATES = ['Puerto Rico', 'Virgin Islands', 'Massachusetts', 'Connecticut', 'New Jersey', 'New Hampshire', 'Vermont', 'New York', 'Rhode Island', 'Wyoming', 'Virginia', 'Maine', 'Georgia',
  'Pennsylvania', 'Delaware', 'West Virginia', 'Ohio', 'Maryland', 'District of Columbia', 'Wisconsin', 'North Carolina', 'South Carolina', 'Kentucky', 'Tennessee', 'Mississippi', 'Alabama',
  'Florida', 'Missouri', 'Arkansas', 'Louisiana', 'Indiana', 'Illinois', 'Michigan', 'Iowa', 'Minnesota', 'South Dakota', 'Nebraska', 'Texas', 'North Dakota', 'Montana', 'Idaho', 'Kansas',
  'Oklahoma', 'Colorado', 'New Mexico', 'Utah', 'Nevada', 'Washington', 'Oregon', 'Arizona', 'California', 'Hawaii', 'Guam', 'Alaska', 'New York'];

const CITIES = ['Mayaguez', 'Moca', 'San Sebastian', 'Agawam', 'Amherst', 'Buckland',
  'Montague', 'Blytheville', 'Gosnell', 'West Memphis', 'Marion', 'Horseshoe Lake', 'New York City']


const PredictionForm = () => {

  const auth = useContext(AuthContext);
  const modal = useRef();
  const [formState, inputHandler] = useForm({
    status: {
      value: '',
      isValid: false
    },
    bed: {
      value: '',
      isValid: false
    },
    bath: {
      value: '',
      isValid: false
    },
    landSize: {
      value: '',
      isValid: false
    },
    city: {
      value: '',
      isValid: false
    },
    state: {
      value: '',
      isValid: false
    },
    zipCode: {
      value: '',
      isValid: false
    },
    houseSize: {
      value: '',
      isValid: false
    },

  }, false);

  const { error, sendRequest, clearError, isLoading } = useHttp();




  const { inputs } = formState;

  const [prediction, setPrediction] = useState();
  const handleSubmission = async (event) => {

    event.preventDefault();
    const status = inputs.status.value;
    const bed = inputs.bed.value;
    const bath = inputs.bath.value;
    const landSize = inputs.landSize.value;
    const city = inputs.city.value;
    const state = inputs.state.value;
    const zipCode = inputs.zipCode.value;
    const houseSize = inputs.houseSize.value;



    const data = {
      'new_input': {
        city,
        status,
        bed: +bed,
        bath: +bath,
        land_size: +landSize,
        state,
        zip_code: +zipCode,
        house_size: +houseSize
      }
    }



    try {

      // predict house prices
      const responseData = await sendRequest('http://localhost:3000/api/ai/predict',
        'POST',
        JSON.stringify(data),
        {
          'Content-type': 'application/json'
        }
      )
      setPrediction(responseData.prediction)
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


  let stateObject = []
  const allstateValues = () => {
    for (const state of STATES) {
      stateObject.push({ 'value': state, 'label': state })
    }
    return stateObject
  }


  let cityObject = []
  const allcityValues = () => {
    for (const city of CITIES) {
      cityObject.push({ 'value': city, 'label': city })
    }
    return cityObject
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
          elementType={'select'}
          label={'status'}
          id={'status'}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={' Please select a value'}
          onInput={inputHandler}
          options={[
            { value: 'for_sale', label: 'For Sale' },
            { value: 'ready_to_build', label: 'Ready to Build' },
          ]}
        />

        <Input
          elementType={'input'}
          type={'text'}
          label={'bed'}
          id={'bed'}
          placeholder={'Enter the number of bedrooms'}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={' Please enter a number of bedrooms'}
          onInput={inputHandler}
        />

        <Input
          elementType={'input'}
          type={'text'}
          label={'bath'}
          id={'bath'}
          placeholder={'Enter the number of bathrooms'}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={' Please enter a number of bathrooms'}
          onInput={inputHandler}
        />

        <Input
          elementType={'input'}
          type={'text'}
          label={'land size (m²)'}
          placeholder={'Enter the land size in square meters'}
          id={'landSize'}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={' Please enter the land size of the property in m²'}
          onInput={inputHandler}
        />

        <Input
          elementType={'input'}
          type={'text'}
          label={'House Size (m²) '}
          id={'houseSize'}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(5)]}
          placeholder={"enter a House Size in m² [ e.g. 10000 --> do not use a comma \",\" ] "}
          errorText={' Please enter a house size in  m², please do not use a comma'}
          onInput={inputHandler}
        />


        <Input
          elementType={'select'}
          label={'state'}
          id={'state'}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={' Please select a state'}
          onInput={inputHandler}
          options={allstateValues()}
        />

        <Input
          elementType={'select'}
          label={'city'}
          id={'city'}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={' Please enter a number of bedrooms'}
          onInput={inputHandler}
          options={allcityValues()}
        />

        <Input
          elementType={'input'}
          type={'text'}
          label={'Zip Code'}
          id={'zipCode'}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(5)]}
          errorText={' please enter a zip code, minimum of 3 numbers and maximum 5 numbers '}
          onInput={inputHandler}
        />




        <div className=" w-full  flex items-start justify-end px-4 gap-3">

          <Button type="button" onClick={onCancelClick}  >
            Cancel
          </Button>

          <Button
            type={'submit'}
            disabled={!formState.isValid}
            primary
          >
            Predict Price
          </Button>

        </div>

      </form>
      <div className=" flex flex-col my-8">
        {
          prediction &&
          <>
            <h1 className="text-[#113264]"> Estimated Price: </h1>
            <h2 className="mx-8"> {Math.round(prediction)} $</h2>
          </>
        }
      </div>
      <ul className="list-decimal list-inside text-gray-500 space-y-2 my-7">
        <p className=" text-gray-400"> to get the lowest price try these: </p>
        <li>For Sale</li>
        <li>  bed = 6, bath= 3 </li>
        <li>  land Size = 404 m², House size = 278 m² </li>
        <li>  Zip code = 676 , state = Puerto Rico, city = moca </li>
      </ul>

    </>
  );
}



export const HousePricePrediction = () => {
  return (
    <>
      <div className="w-[1024px] h-full mx-auto px-16 py-4 my-8 flex flex-col gap-0 ">
        <h1 className="text-2xl text-[#113264] my-2">Ensemble of Ai</h1>
        <p> This is a <span className=" "> Price esitmator  </span> it combines <span className=" font-extrabold" >  Machine Learning  and Deep Learning Approaches  </span>,
          designed to estimate house prices in the US. </p>

        <p>
          The 3 ML & DL models are trained on a range of <span className="text-lg"> $162,755 - $806,130 </span>
          please note that, the closer the price to $162,755 the more it is prune to the error of ± $75,000.
        </p>


        <p className="text-center "> <span className=" text-[#113264]"> Again </span> House price estimates have a ± $75,000 error margin. </p>

      </div>
      <div className=" mx-2 px-[17rem] py-2">
        <PredictionForm />
      </div>

    </>
  );
}