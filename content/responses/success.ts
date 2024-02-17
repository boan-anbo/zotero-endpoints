import {EndpointsResponse} from '../types/response';


export const ResponseSuccess = (message?: string, payload?: any): EndpointsResponse => {
  if (!message) {
    message = 'Success';
  }

  const code = 200;
  return [code, 'application/json', JSON.stringify({message, payload, code})];
}

export const ResponseSuccessPayloadOnly = (payload?: any): EndpointsResponse => ResponseSuccess(undefined, payload)

export const ResponseError = (message?: string, payload?: any): EndpointsResponse => {
  if (!message) {
    message = 'Error';
  }
  else {
    message = `Error: ${message}`;
  }
  const code = 400;
  return [code, 'application/json', JSON.stringify({message, payload, code})];
}
