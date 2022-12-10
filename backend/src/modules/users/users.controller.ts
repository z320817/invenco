import * as express from "express";
import User from "./users.interface";

class UsersController {
  public path = "/users";
  public router = express.Router();

  private users: User[] = [
    {
      firstName: "string",
      lastName: "string",
      jobTitle: "string",
      email: "string",
      phoneNumber: "string",
      password: "string",
    },
  ];

  constructor() {
    this.createRoutes();
  }

  private createRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.post(this.path, this.createUser);
  }

  private getAllUsers = (
    request: express.Request,
    response: express.Response
  ) => {
    response.send(this.users);
  };

  private createUser = (
    request: express.Request,
    response: express.Response
  ) => {
    const user: User = request.body;
    this.users.push(user);
    response.send(user);
  };
}

export default UsersController;
