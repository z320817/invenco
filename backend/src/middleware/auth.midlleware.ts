import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import AuthenticationTokenMissing from "../providers/exceptions/authentication/auth-token-missing.exception";
import AuthenticationTokenInvalid from "../providers/exceptions/authentication/auth-token-invalid.exception";
import JWT from "../providers/interfaces/jwt.interface";
import EmployeeModel from "../modules/employees/employee.model";
import HttpException from "../providers/exceptions/general/http.exception";
import { AuthorizationRequest } from "providers/interfaces/authorization.interface";

const AuthMiddleware = async (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  const authToken = request.header("Authorization")?.replace("Bearer ", "");

  if (!authToken) {
    next(new AuthenticationTokenMissing());
  }

  try {
    const decoded = jwt.verify(
      authToken,
      process.env.BACKEND_JWT_SECRET
    ) as JWT;
    const id = decoded._id;
    const employee = await EmployeeModel.findById(id);

    if (employee) {
      (request as AuthorizationRequest).token = decoded;
      next();
    } else {
      next(new AuthenticationTokenInvalid());
    }
  } catch (error) {
    if (error.status && error.message) {
      next(new HttpException(error.status, error.message));
    } else {
      next(
        new HttpException(500, "Internal Server Error: Authorization Error")
      );
    }
  }
};

export default AuthMiddleware;
