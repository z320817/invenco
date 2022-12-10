import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import ErrorMiddleware from "./middleware/error.middleware";
import Controller from "./providers/interfaces/controllers.interface";
import ServerSelectionError from "providers/exceptions/general/server-selection.exception";
import HttpException from "providers/exceptions/general/http.exception";

class App {
  public app: express.Application;
  public port: string;

  constructor(controllers: Controller[], port: string) {
    this.app = express();
    this.port = port;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }

  private connectToTheDatabase() {
    const {
      DATABASE_USER,
      DATABASE_PASSWORD,
      MONGO_HOST,
      MONGO_PORT,
      MONGO_INITDB_DATABASE,
    } = process.env;

    try {
      mongoose.connect(
        `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/?authSource=${MONGO_INITDB_DATABASE}`
      );
    } catch (error) {
      if (error.status && error.message) {
        new HttpException(500, "Internal Server Error");
      } else {
        throw new ServerSelectionError();
      }
    }
  }
}

export default App;
