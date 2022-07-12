import {AxiosError} from 'axios';
import {
  NO_INTERNET,
  NO_RESPONSE_FROM_SERVER,
  UNAUTHORIZED_ACCESS,
  UNKNOWN_ERROR,
} from '@/constants/errorTexts';
import {store} from '@/redux/store';

export const getErrorMessage = (error: AxiosError | any): string => {
  let message;

  let hasInternetConnection = store.getState().app.hasInternetConnection;

  if (!hasInternetConnection) {
    message = NO_INTERNET;
  } else if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    //console.log(error.response.data);
    //console.log(error.response.status);
    //console.log(error.response.headers);

    if (error.response.status === 401) {
      message = UNAUTHORIZED_ACCESS;
    } else {
      message = UNKNOWN_ERROR;
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js

    //console.log(error.request);
    message = NO_RESPONSE_FROM_SERVER;
  } else {
    // Something happened in setting up the request that triggered an Error
    //console.log('Error', error.message);
    message = error?.message;
  }
  return message;
};
