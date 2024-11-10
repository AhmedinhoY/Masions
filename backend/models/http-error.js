class HttpError extends Error {
  constructor(message, errorCode){
    super(message); // Add a message property to the errors
    this.code = errorCode;
  }
}


module.exports = HttpError;