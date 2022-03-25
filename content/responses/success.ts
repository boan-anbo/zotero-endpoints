import {EndpointsResponse} from '../types/response';


export const ResponseSuccess = (message?: string, payload?: any): EndpointsResponse => {
  if (!message) {
    message = 'Success';
  }

  return [200, 'application/json', JSON.stringify({message, payload})];
}

export const ResponseSuccessPayload = (payload?: any): EndpointsResponse => ResponseSuccess(undefined, payload)

export const ResponseError = (message?: string, payload?: any): EndpointsResponse => {
  if (!message) {
    message = 'Error';
  }
  return [400, 'application/json', JSON.stringify({message, payload})];
}
