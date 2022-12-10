import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import AuthenticationTokenMissing from "../providers/exceptions/authentication/auth-token-missing.exception";
import AuthenticationTokenInvalid from "../providers/exceptions/authentication/auth-token-invalid.exception";
import JWT from "../providers/interfaces/jwt.interface";
import EmployeeModel from "../modules/employees/employee.model";
import HttpException from "../providers/exceptions/general/http.exception";

const AuthMiddleware = async (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.BACKEND_JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as JWT;
      const id = verificationResponse._id;
      const employee = await EmployeeModel.findById(id);

      if (employee) {
        next();
      } else {
        next(new AuthenticationTokenInvalid());
      }
    } catch (error) {
      if (error.status && error.message) {
        next(new HttpException(error.status, error.message));
      } else {
        next(new HttpException(500, "Internal Server Error"));
      }
    }
  } else {
    next(new AuthenticationTokenMissing());
  }
};

export default AuthMiddleware;
