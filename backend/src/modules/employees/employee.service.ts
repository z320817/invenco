import { Request, Response, NextFunction } from "express";
import EmployeeNotFound from "../../providers/exceptions/employees/employee-not-found.exception";
import CreateEmployeeDTO from "./employee.dto";
import Employee from "./employee.interface";
import EmployeeModel from "./employee.model";

class EmployeeService {
  private employeeModel = EmployeeModel;

  constructor() {}

  public getAllEmployees = async (
    _: Request,
    response: Response
  ): Promise<void> => {
    const posts = await this.employeeModel
      .find()
      .populate("employee", "-password");

    response.send(posts);
  };

  public getEmployeeById = async (
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

  public updateEmployee = async (
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

  public createEmployee = async (request: Request, response: Response) => {
    const employeeData: CreateEmployeeDTO = request.body;
    const createdEmployee = new this.employeeModel({
      ...employeeData,
    });
    const savedEmployee: Employee = await createdEmployee.save();

    response.send(savedEmployee);
  };

  public deleteEmployee = async (
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

export default EmployeeService;
