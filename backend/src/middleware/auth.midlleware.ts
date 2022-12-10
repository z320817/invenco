import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import AuthenticationTokenMissing from "../providers/exceptions/authentication/auth-token-missing.exception";
import AuthenticationTokenInvalid from "../providers/exceptions/authentication/auth-token-invalid.exception";
import JWT from "../providers/interfaces/jwt.interface";
import EmployeeModel from "../modules/employees/employee.model";
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
    const decodedToken = jwt.verify(
      authToken,
      process.env.BACKEND_JWT_SECRET
    ) as JWT;
    const id = decodedToken._id;
    const employee = await EmployeeModel.findById(id);

    if (employee) {
      (request as AuthorizationRequest).token = decodedToken;
      next();
    } else {
      next(new AuthenticationTokenInvalid());
    }
  } catch {
    next(new AuthenticationTokenInvalid());
  }
};

export default AuthMiddleware;
