import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import AuthenticationTokenMissing from "../providers/exceptions/authentication/auth-token-missing.exception";
import AuthenticationTokenInvalid from "../providers/exceptions/authentication/auth-token-invalid.exception";
import AuthorizationRequest from "../providers/interfaces/authorization.interface";
import HttpException from "../providers/exceptions/general/http.exception";
import JWT from "../providers/interfaces/jwt.interface";
import UserModel from "../modules/users/user.model";

const AuthMiddleware = async (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const authToken = request.header("Authorization")?.replace("Bearer ", "");

    if (!authToken) {
      next(new AuthenticationTokenMissing());
    }

    const decodedToken = verify(
      authToken,
      process.env.BACKEND_JWT_SECRET
    ) as JWT;
    const id = decodedToken.id;
    const user = await UserModel.findById(id);

    if (user && user.role == "admin") {
      (request as AuthorizationRequest).token = decodedToken;
      next();
    } else {
      next(new AuthenticationTokenInvalid());
    }
  } catch {
    next(new HttpException(500, "Internal Server Error: Authentication error"));
  }
};

export default AuthMiddleware;
