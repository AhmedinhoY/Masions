

import { useState, useCallback } from 'react';

export const useHttp = () => {

  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

    try {
      const response = await fetch(url, {
        method,
        headers,
        body
      })

      const respnseData = await response.json();

      if (!response.ok) {
        throw new Error(respnseData.message);
      }


      return respnseData;


    } catch (err) {
      
      // this will cause the try { .... } catch (err) { ... }
      //  to work as intended inside other files

      setError(err.message);
      throw err;
    }



  }, [])

  const clearError = () => {
    setError(null);
  }


  return { sendRequest, error, clearError };

}