import { Router } from "express";
import AuthMiddleware from "../../middleware/auth.midlleware";
import InstanceIdValidator from "../../middleware/instance-id-validator.middleware";
import RequestBodyValidator from "../../middleware/request-body-validator.middleware copy";
import CreateEmployeeDTO from "./dto/employee.dto";
import EmployeeIdDTO from "./dto/employee-id.dto";
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
        InstanceIdValidator(EmployeeIdDTO),
        this.employeeService.getEmployeeById
      )
      .patch(
        `${this.path}/:id`,
        AuthMiddleware,
        RequestBodyValidator(CreateEmployeeDTO, true),
        this.employeeService.updateEmployee
      )
      .delete(
        `${this.path}/:id`,
        AuthMiddleware,
        InstanceIdValidator(EmployeeIdDTO),
        this.employeeService.deleteEmployee
      )
      .post(
        this.path,
        AuthMiddleware,
        RequestBodyValidator(CreateEmployeeDTO),
        this.employeeService.createEmployee
      );
  }
}

export default EmployeesController;
