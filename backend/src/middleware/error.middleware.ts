import { NextFunction, Request, Response } from "express";

const ErrorMiddleware = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  response.status(status).send({
    message,
    status,
  });
};

export default ErrorMiddleware;
