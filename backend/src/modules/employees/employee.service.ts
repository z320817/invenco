import { Request, Response, NextFunction } from "express";
import HttpException from "providers/exceptions/general/http.exception";
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
    try {
      const posts = await this.employeeModel
        .find()
        .populate("employee", "-password");

      response.send(posts);
    } catch {
      throw new HttpException(
        500,
        "Internal Server Error: Get All Employees Error"
      );
    }
  };

  public getEmployeeById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = request.params.id;
      const employeeData: Employee = await this.employeeModel.findById(id);

      if (employeeData) {
        response.send(employeeData);
      } else {
        next(new EmployeeNotFound(id));
      }
    } catch {
      throw new HttpException(
        500,
        "Internal Server Error: Get Employee By ID Error"
      );
    }
  };

  public updateEmployee = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = request.params.id;
      const employeeData: Employee = request.body;
      const employee = await this.employeeModel.findByIdAndUpdate(
        id,
        employeeData,
        {
          new: true,
        }
      );

      if (employee) {
        response.send(employee);
      } else {
        next(new EmployeeNotFound(id));
      }
    } catch {
      throw new HttpException(
        500,
        "Internal Server Error: Update Employee Error"
      );
    }
  };

  public createEmployee = async (request: Request, response: Response) => {
    try {
      const employeeData: CreateEmployeeDTO = request.body;
      const createdEmployee = new this.employeeModel({
        ...employeeData,
      });
      const savedEmployee: Employee = await createdEmployee.save();

      response.send(savedEmployee);
    } catch {
      throw new HttpException(
        500,
        "Internal Server Error: Create Employee Error"
      );
    }
  };

  public deleteEmployee = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = request.params.id;
      const successResponse = await this.employeeModel.findByIdAndDelete(id);

      if (successResponse) {
        response.send(200);
      } else {
        next(new EmployeeNotFound(id));
      }
    } catch {
      throw new HttpException(
        500,
        "Internal Server Error: Delete Employee Error"
      );
    }
  };
}

export default EmployeeService;
