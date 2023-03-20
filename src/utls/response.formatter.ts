import { Result, ValidationError } from 'express-validator';

/**
 * Usage and Description - This file will be used to structure
 * the API responses to a standard structure
 *
 **/

export interface ResponseType {
  error: boolean;
  status: number;
  message?: undefined | null | string;
  data?: undefined | object;
}

/**
 * Usage and Description - This function will structure all
 * the success API responses to a standard structure
 *
 **/
export const successRes: any = (
  message: null | string = null,
  data: null | object = null,
  status: number = 200,
) => ({
  error: false,
  status,
  message,
  data,
});

/**
 * Usage and Description - This function will structure all
 * the error API responses to a standard structure
 *
 **/
export const errorRes: any = (
  message: null | string = null,
  data: null | object = null,
  status: number = 400,
) => ({
  error: true,
  status,
  message,
  data,
});

/**
 * Usage and Description - This function will structure all
 * the validation error API responses to a standard structure
 *
 **/
export const validationErrorRes: any = (
  validationErrors: Result<ValidationError>,
) => {
  return {
    error: true,
    status: 400,
    message: 'API validation errors',
    errors: validationErrors.array(),
  };
};
