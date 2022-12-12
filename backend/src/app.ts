import * as express from "express";
import * as bodyParser from "body-parser";
import { Server } from "http";
import ErrorMiddleware from "./middleware/error-handling.middleware";
import ErrorLoggerMiddleware from "./middleware/error-logger.middleware";
import ForbiddedPathMiddleware from "./middleware/forbidden-routes.middleware";
import ConnectToTheDatabase from "./providers/db-connection/db-connection.provider";
import Controller from "./providers/interfaces/controllers.interface";


class App {
  public app: express.Application;
  public port: string;
  public server: Server;

  constructor(controllers: Controller[], port: string) {
    this.app = express();
    this.port = port;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.server = this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(ForbiddedPathMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
    this.app.use(ErrorLoggerMiddleware);
  }

  private async connectToTheDatabase() {
   await ConnectToTheDatabase();
  }
}

export default App;
