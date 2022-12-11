import { NextFunction, Request, Response } from "express";
import HttpException from "../providers/exceptions/general/http.exception";

const ErrorLoggerMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error);
  next(error);
};

export default ErrorLoggerMiddleware;
