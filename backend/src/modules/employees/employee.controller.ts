import * as express from "express";
import Employee from "./employee.interface";

class EmployeesController {
  public path = "/users";
  public router = express.Router();

  private employee: Employee[] = [
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
    this.router.get(this.path, this.getAllEmployees);
    this.router.post(this.path, this.createEmployee);
  }

  private getAllEmployees = (
    request: express.Request,
    response: express.Response
  ) => {
    response.send(this.employee);
  };

  private createEmployee = (
    request: express.Request,
    response: express.Response
  ) => {
    const employee: Employee = request.body;
    this.employee.push(employee);
    response.send(employee);
  };
}

export default EmployeesController;
