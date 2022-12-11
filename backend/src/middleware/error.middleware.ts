import { NextFunction, Request, Response } from "express";
import HttpException from "../providers/exceptions/general/http.exception";

const ErrorMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message =
    error.message || "Internal Server Error: Error Middleware Response";
  response.header("Content-Type", "application/json").status(status).send({
    message,
    status,
  });

  next(response);
};

export default ErrorMiddleware;
