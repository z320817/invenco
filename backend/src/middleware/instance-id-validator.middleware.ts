import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import HttpException from "../providers/exceptions/general/http.exception";

const InstanceIdValidator = (type: any): RequestHandler => {
  return (request: Request, response: Response, next: NextFunction) => {
    validate(plainToInstance(type, request.params)).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) => Object.values(error.constraints))
            .join(", ");
          next(new HttpException(400, message));
        } else if (!isValidObjectId(request.params.id)) {
          next(new HttpException(400, "Employee ID is not valid"));
        } else {
          next();
        }
      }
    );
  };
};

export default InstanceIdValidator;
