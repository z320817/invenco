import { Router } from "express";
import Controller from "../../providers/interfaces/controllers.interface";

class AuthController implements Controller {
  public path = "/auth";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {}
}

export default AuthController;
