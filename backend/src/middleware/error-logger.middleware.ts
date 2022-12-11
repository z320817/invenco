import { NextFunction, Request, Response } from "express";
import HttpException from "../providers/exceptions/general/http.exception";

const ErrorLoggerMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error("Error message: ", error.message);
  console.error("Error status: ", error.status);

  next(error);
};

export default ErrorLoggerMiddleware;
