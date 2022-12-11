import { Router } from "express";
import Controller from "../../providers/interfaces/controllers.interface";
import ForbiddenRoutesService from "./forbidden-routes.service";

class ForbiddenRoutesController implements Controller {
  public path = "*";
  public router = Router();
  private forbiddenRoutesService = new ForbiddenRoutesService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.all(
      `${this.path}`,
      this.forbiddenRoutesService.sendForbiddenResponse
    );
  }
}

export default ForbiddenRoutesController;
