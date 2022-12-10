import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import AuthenticationCredentialsInvalid from "../../providers/exceptions/authentication/auth-credentials-invalid.exception";
import HttpException from "../../providers/exceptions/general/http.exception";
import UserModel from "../../modules/users/user.model";
import User from "../../modules/users/user.interface";
import AuthDTO from "./auth.dto";

class AuthService {
  private user = UserModel;

  constructor() {}

  private createToken(user: User): { token: string } {
    try {
      const expiresInOneHour = 60 * 60;
      const secret = process.env.BACKEND_JWT_SECRET;
      const dataStoredInToken = {
        id: user.id,
        expiresIn: expiresInOneHour,
        role: user.role,
      };

      return {
        token: sign(dataStoredInToken, secret, {
          expiresIn: expiresInOneHour,
        }),
      };
    } catch {
      throw new HttpException(
        500,
        "Internal Server Error: Auth Token Creation Error"
      );
    }
  }

  public logIn = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const authData: AuthDTO = request.body;
      const user = await this.user.findOne({ email: authData.email });
      const token = this.createToken(user);
      const isPasswordMatching = await bcrypt.compare(
        authData.password,
        user.password
      );

      if (isPasswordMatching) {
        response.send(token);
      } else {
        next(new AuthenticationCredentialsInvalid());
      }
    } catch {
      throw new HttpException(500, "Internal Server Error: Auth LogIn Error");
    }
  };
}

export default AuthService;
