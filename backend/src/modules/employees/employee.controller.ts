import { Request, Response, NextFunction, Router } from "express";
import AuthMiddleware from "../../middleware/auth.midlleware";
import ValidationMiddleware from "../../middleware/validation.middleware";
import EmployeeNotFound from "../../providers/exceptions/employees/employee-not-found.exception";
import CreateEmployeeDTO from "./employee.dto";
import EmployeeModel from "./employee.model";
import Employee from "./employee.interface";

class EmployeesController {
  public path = "/employee";
  public router = Router();
  private employeeModel = EmployeeModel;

  constructor() {
    this.createRoutes();
  }

  private createRoutes() {
    this.router
      .get(this.path, AuthMiddleware, this.getAllEmployees)
      .get(`${this.path}/:id`, AuthMiddleware, this.getEmployeeById)
      .patch(
        `${this.path}/:id`,
        AuthMiddleware,
        ValidationMiddleware(CreateEmployeeDTO, true),
        this.updateEmployee
      )
      .delete(`${this.path}/:id`, AuthMiddleware, this.deleteEmployee)
      .post(
        this.path,
        AuthMiddleware,
        ValidationMiddleware(CreateEmployeeDTO),
        this.createEmployee
      );
  }

  private getAllEmployees = async (
    _: Request,
    response: Response
  ): Promise<void> => {
    const posts = await this.employeeModel
      .find()
      .populate("employee", "-password");

    response.send(posts);
  };

  private getEmployeeById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const employeeData: Employee = await this.employeeModel.findById(id);

    if (employeeData) {
      response.send(employeeData);
    } else {
      next(new EmployeeNotFound(id));
    }
  };

  private updateEmployee = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const employeeData: Employee = await this.employeeModel.findById(id);
    const post = await this.employeeModel.findByIdAndUpdate(id, employeeData, {
      new: true,
    });

    if (post) {
      response.send(post);
    } else {
      next(new EmployeeNotFound(id));
    }
  };

  private createEmployee = async (request: Request, response: Response) => {
    const employeeData: CreateEmployeeDTO = request.body;
    const createdEmployee = new this.employeeModel({
      ...employeeData,
    });
    const savedEmployee: Employee = await createdEmployee.save();

    response.send(savedEmployee);
  };

  private deleteEmployee = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const successResponse = await this.employeeModel.findByIdAndDelete(id);

    if (successResponse) {
      response.send(200);
    } else {
      next(new EmployeeNotFound(id));
    }
  };
}

export default EmployeesController;
