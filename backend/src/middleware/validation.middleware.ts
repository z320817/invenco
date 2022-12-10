import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import HttpException from "../providers/exceptions/general/http.exception";

const ValidationMiddleware = (
  type: any,
  skipMissingProperties = false
): RequestHandler => {
  return (request: Request, _: Response, next: NextFunction) => {
    validate(plainToInstance(type, request.body), {
      skipMissingProperties,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => Object.values(error.constraints))
          .join(", ");
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

export default ValidationMiddleware;
