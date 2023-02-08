import { Result, ValidationError } from "express-validator";

export interface ResponseType {
  error: boolean;
  status: number;
  message?: undefined | null | string;
  data?: undefined | object;
}

export const successRes: any = (
  message: null | string = null,
  data: null | object = null,
  status: number = 200
) => ({
  error: false,
  status,
  message,
  data,
});

export const errorRes: any = (
  message: null | string = null,
  data: null | object = null,
  status: number = 400
) => ({
  error: true,
  status,
  message,
  data,
});

export const validationErrorRes: any = (
  validationErrors: Result<ValidationError>
) => {
  return {
    error: true,
    status: 400,
    message: "API validation errors",
    errors: validationErrors.array(),
  };
};
