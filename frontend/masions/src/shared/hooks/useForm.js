import { useCallback, useReducer } from "react";


const formReducer = (state, action) => {
  let formIsValid;
  switch (action.type) {
    case 'INPUT_CHANGE':
      formIsValid = true;
      for (const inputId in state.inputs) {
        // if the field is undefined , then continue to a new loop operation
        if(!state.inputs[inputId]){
          continue;
        }


        if (inputId == action.inputId) {
          formIsValid = formIsValid & action.isValid;
        } else {
          formIsValid = formIsValid & state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };

      case 'SET_DATA':
        return {
          inputs: action.inputs,
          isValid: action.formIsValid,
        }
    default:
      return state;
  }

}


export const useForm = (initialInputs, initialFormValidity) => {

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });


  // making sure that this function is created only once 
  // even if this page re-renders multiple times due to state changes 
  // so now we do have a infinite loop caused by useEffect & this function re-rendering 
  // useCallback is very cool
  const inputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({
        type: 'INPUT_CHANGE',
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const setFormData = useCallback((inputData, formValidity) => { 

    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, [])


  return [formState, inputHandler, setFormData];

}