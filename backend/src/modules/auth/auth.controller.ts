import { Router } from "express";
import validationMiddleware from "../../middleware/validation.middleware";
import Controller from "../../providers/interfaces/controllers.interface";
import AuthService from "./auth.service";
import AuthDTO from "./auth.dto";

class AuthController implements Controller {
  public path = "/auth";
  public router = Router();
  private authService = new AuthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(AuthDTO),
      this.authService.logIn
    );
  }
}

export default AuthController;
