import { useEffect, useState, useCallback } from "react";
import { getToken } from "../../util/getToken";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationTime, setExpirationTime] = useState();
  const [userId, setUserId] = useState();


  // useCallback is so powerful to minimize the execution of the function 
  // execute once and remember it, very very powerful
  // use console.log and see the value of isLoggedIn to see to the useCallback power
  const login = useCallback((uid, token, oldExpirationDate) => {
    setUserId(uid);
    setToken(token);

    // new tokenEpirationDate = now + 1hr 
    // if the expiration date exists then use it
    const tokenExpirationDate = oldExpirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setExpirationTime(tokenExpirationDate);


    // you can only store text inside the localStorage
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString() // either keep the old one or the new one
      })
    );
  }, []);


  const logout = useCallback(() => {
    setToken(null);
    setExpirationTime(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);


  useEffect(() => {
    if (token && tokenExpirationTime) {
      let remainingTime = tokenExpirationTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationTime]);

  useEffect(() => {
    const storedData = getToken();

    // storedData can be null 
    // so return and do not do anything
    if (!storedData) {
      return;
    }

    if (
      storedData.uid &&
      storedData.token &&
      // we use the new Date(storedData.expiration) to convert the ISOstring into a date object 
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.uid, storedData.token, new Date(storedData.expiration));
    }


  }, [login]);


  return { token, userId , login, logout};
}