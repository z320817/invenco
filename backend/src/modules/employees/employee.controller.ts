import { Router } from "express";
import AuthMiddleware from "../../middleware/auth.midlleware";
import ValidationMiddleware from "../../middleware/validation.middleware";
import CreateEmployeeDTO from "./employee.dto";
import EmployeeService from "./employee.service";

class EmployeesController {
  public path = "/employee";
  public router = Router();
  private employeeService = new EmployeeService();

  constructor() {
    this.createRoutes();
  }

  private createRoutes() {
    this.router
      .get(this.path, AuthMiddleware, this.employeeService.getAllEmployees)
      .get(
        `${this.path}/:id`,
        AuthMiddleware,
        this.employeeService.getEmployeeById
      )
      .patch(
        `${this.path}/:id`,
        AuthMiddleware,
        ValidationMiddleware(CreateEmployeeDTO, true),
        this.employeeService.updateEmployee
      )
      .delete(
        `${this.path}/:id`,
        AuthMiddleware,
        this.employeeService.deleteEmployee
      )
      .post(
        this.path,
        AuthMiddleware,
        ValidationMiddleware(CreateEmployeeDTO),
        this.employeeService.createEmployee
      );
  }
}

export default EmployeesController;
