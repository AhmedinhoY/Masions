/* eslint-disable no-unused-vars */
import { useForm } from "../../shared/hooks/useForm";
import { Button } from "../../shared/Button";
import { Input } from "../../shared/Input";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "../../shared/UI-Elements/ErrorModal";
import { useHttp } from "../../shared/hooks/useHttp";
import LoadingSpinner from "../../shared/UI-Elements/LoadingSpinner";
import { ImageUpload } from "../../shared/ImageUpload";






const AuthForm = () => {

  const auth = useContext(AuthContext);

  const navigate = useNavigate();


  const modal = useRef();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
  }, false);

  const { sendRequest, error, clearError, isLoading } = useHttp();



  const switchHandler = () => {
    // React is smart so it will render all of the stateChaning 
    // states in one go, so it will combine them then run them all at once .... 
    // "و قل ربي زدني علما"

    // signUp
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined,
        image: undefined,
      },
        formState.inputs.email.isValid && formState.inputs.password.isValid 
      );
    } else {
      // Login Mode - name is empty value
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        },
        image: {
          value: null,
          isValid: false
        }
      }, false
      );
    }



    setIsLoginMode(prevState => !prevState);

  }


  const handleSubmission = async (e) => {
    e.preventDefault();





    if (isLoginMode) {
      // Login
      try {

        const responseData = await sendRequest('http://localhost:3000/api/users/login', 'POST',

          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json'
          },
        );

        auth.login(responseData.user.id, responseData.token);
        navigate('/');

      } catch (err) {
        console.log(' error in login mode');
      }

    } else {
      // SignUp
      try {

        const email = formState.inputs.email.value;
        const password = formState.inputs.password.value;
        const name = formState.inputs.name.value;
        const image = formState.inputs.image.value;

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('image', image);


        const responseData = await sendRequest('http://localhost:3000/api/users/signup',
          'POST',
          formData,
        );

        auth.login(responseData.user.id, responseData.token);
        navigate('/');
        
      } catch (err) {
        console.log(' error in signUp mode');

      }

    }

  }



  if (error) {
    modal.current.open();
  }



  return (
    <>
      <ErrorModal ref={modal} error={error} onClear={clearError} />

      <form
        className={`flex flex-col gap-6  bg-white min-w-[50vh] min-h-full p-[2rem] 
      rounded-md drop-shadow-2xl`}
        onSubmit={handleSubmission}
      >
        {isLoading && <LoadingSpinner asOverlay />}

        {!isLoginMode && <Input
          elementType={'input'}
          type={'text'}
          label={'name'}
          id={'name'}
          validators={[VALIDATOR_REQUIRE()]}
          errorText={' Please provide a value to this field'}
          onInput={inputHandler}
        />}

        <Input
          elementType={'input'}
          type={'text'}
          label={'email'}
          id={'email'}
          validators={[VALIDATOR_EMAIL()]}
          errorText={' Please enter a correct email'}
          onInput={inputHandler}
        />

        <Input
          elementType={'input'}
          type={'text'}
          label={'password'}
          id={'password'}
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText={' Please enter a password with min. length 6 characters'}
          onInput={inputHandler}
        />

        {!isLoginMode &&
          <ImageUpload name={'image'} onInput={inputHandler} />
        }



        <div className=" w-full  flex items-start justify-end px-4">

          <Button
            type={'submit'}
            disabled={!formState.isValid}
            blue
          >
            {isLoginMode ? 'Login' : 'Signup'}

          </Button>
        </div>



      </form>

      <div className="  flex items-center justify-center my-8">
        <div className=" rounded-md px-8 py-2 drop-shadow-lg text-xl" >
          <Button
            blue
            onClick={switchHandler}
          >
            {isLoginMode ? 'SignUp' : 'Login'}
          </Button>
        </div>
      </div>

    </>
  );
}

export const Auth = () => {

  return (
    <>
      <div className=" min-w-[1024px] min-h-full flex flex-col items-center justify-center mx-auto my-10">
        <AuthForm />
      </div>
    </>
  );


}