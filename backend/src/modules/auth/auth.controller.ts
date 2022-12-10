import * as bcrypt from "bcrypt";
import { Router, Request, Response, NextFunction } from "express";
import validationMiddleware from "../../middleware/validation.middleware";
import UserModel from "../../modules/users/user.model";
import AuthenticationCredentialsInvalid from "../../providers/exceptions/authentication/auth-credentials-invalid.exception";
import Controller from "../../providers/interfaces/controllers.interface";
import AuthDTO from "./auth.dto";

class AuthController implements Controller {
  public path = "/auth";
  public router = Router();
  private user = UserModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(AuthDTO),
      this.logIn
    );
  }

  private logIn = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const authData: AuthDTO = request.body;
    const user = await this.user.findOne({ email: authData.email });

    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        authData.password,
        user.password
      );

      if (isPasswordMatching) {
        user.password = undefined;

        response.send(user);
      } else {
        next(new AuthenticationCredentialsInvalid());
      }
    } else {
      next(new AuthenticationCredentialsInvalid());
    }
  };
}

export default AuthController;
