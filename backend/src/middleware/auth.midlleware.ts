import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import AuthenticationTokenMissing from "../providers/exceptions/authentication/auth-token-missing.exception";
import AuthenticationTokenInvalid from "../providers/exceptions/authentication/auth-token-invalid.exception";
import HttpException from "../providers/exceptions/general/http.exception";
import NotAuthorized from "../providers/exceptions/authorization/not-authorized.exception";
import AuthorizationRequest from "../providers/interfaces/authorization.interface";
import JWT from "../providers/interfaces/jwt.interface";
import UserModel from "../modules/users/user.model";

const AuthMiddleware = async (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const authToken = ParseBearerToken(request, next);
    const decodedToken = DecodeToken(authToken, next);
    const user = await UserModel.findById(decodedToken.id);

    if (user && user.role == "admin") {
      (request as AuthorizationRequest).token = decodedToken;
      next();
    } else {
      next(new NotAuthorized());
    }
  } catch {
    next(new HttpException(500, "Internal Server Error: Authentication error"));
  }
};

const DecodeToken = (authToken: string, next: NextFunction): JWT => {
  try {
    return verify(authToken, process.env.BACKEND_JWT_SECRET) as JWT;
  } catch {
    next(new AuthenticationTokenInvalid());
  }
};

const ParseBearerToken = (request: Request, next: NextFunction): string => {
  try {
    const authToken = request.header("Authorization")?.replace("Bearer ", "");

    if (!authToken) {
      next(new AuthenticationTokenMissing());
    }

    return authToken;
  } catch {
    next(
      new HttpException(500, "Internal Server Error: Parse Bearer Token Error")
    );
  }
};

export default AuthMiddleware;
