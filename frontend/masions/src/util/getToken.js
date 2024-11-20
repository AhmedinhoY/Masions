export const getToken = () => {
  const storedData = JSON.parse(localStorage.getItem('userData'));
  if(!storedData){
    return null;
  }
  return { uid: storedData.userId, token: storedData.token, expiration: storedData.expiration}
}