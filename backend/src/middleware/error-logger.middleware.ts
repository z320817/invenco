import { NextFunction, Request, Response } from "express";
import HttpException from "../providers/exceptions/general/http.exception";

const ErrorLoggerMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error("\x1b[31m Error message: ", error.message);
  console.error("\x1b[31m Error name: ", error.name);
  console.error("\x1b[33m Error stack: ", error.stack)

  next(error);
};

export default ErrorLoggerMiddleware;
