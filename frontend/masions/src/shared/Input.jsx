/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useReducer } from "react";
import { validate } from "./util/validators";


const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state, // if we manage other cases the state will matter
        value: action.val,
        isValid: validate(action.val, action.validators)
      };

    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      }

    default:
      return state;
  }
};



export const Input = (
  {
    id,
    rows,
    type,
    placeholder,
    label,
    elementType,
    validators,
    errorText,
    onInput,
    defaultValue, 
    valid
  }
) => {

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: defaultValue || '',
    isValid: valid || false,
    isTouched: false,
  });

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: validators,
    });
  }

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  }


  // HERE we use let because we will add some styling to it
  // making the styles added to this project more adaptable to changes
  let inputCss =
    " p-1 border-b-[2px] rounded-sm border-gray-400 text-gray-600 bg-gray-200 focus:outline-none focus:border-gray-600 ";
  const pCss = " flex flex-col gap-1 min-w-full px-4 py-2";
  const labelCss = "text-sm font-bold uppercase text-gray-800";


  // using object destructing - { ES6 JS SYNTAX } to get the 
  // values necessary and to avoid executing the 
  // useEffect because of the changes to the props || inputState 
  // the goal of useEffect is when a value changes then 
  // it will re-run the onInput function inorder to pass the values to the form 
  // then use the data to send Http requests to the server.
  const { isValid, value } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, isValid, value, onInput]);



  // either renders an input or textarea
  const element = elementType == 'input' ?
    <input
      name={id}
      id={id}
      type={type}
      placeholder={placeholder}
      className={`${inputCss} ${!inputState.isValid && inputState.isTouched && ' border-red-500'}`}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputState.value}
    />
    :
    <textarea
      name={id}
      id={id}
      rows={rows || 3}
      className={`${inputCss} ${!inputState.isValid && inputState.isTouched && ' border-red-500'}`}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputState.value}
    />;



  return (
    <div className={`${pCss} `}>
      <label
        htmlFor={id}
        className={`${labelCss} ${!inputState.isValid && inputState.isTouched && ' text-red-500'} `}
      >{label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && (<p className={`${!inputState.isValid && inputState.isTouched && ' text-red-500'}`}> {errorText} </p>)}
    </div>
  );
}