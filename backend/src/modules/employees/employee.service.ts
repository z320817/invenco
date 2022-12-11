import * as bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import HttpException from "../../providers/exceptions/general/http.exception";
import EmployeeNotFound from "../../providers/exceptions/employees/employee-not-found.exception";
import EmployeeAlreadyExistsException from "../../providers/exceptions/employees/employee-already-exists.exception";
import CreateEmployeeDTO from "./dto/employee.dto";
import Employee from "./employee.interface";
import EmployeeModel from "./employee.model";

class EmployeeService {
  private employeeModel = EmployeeModel;

  constructor() {}

  public getAllEmployees = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const employees = await this.employeeModel.find();

      response.send(employees);
    } catch {
      next(
        new HttpException(500, "Internal Server Error: Get All Employees Error")
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
      next(
        new HttpException(
          500,
          "Internal Server Error: Get Employee By ID Error"
        )
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
      next(
        new HttpException(500, "Internal Server Error: Update Employee Error")
      );
    }
  };

  public createEmployee = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const employeeData: CreateEmployeeDTO = request.body;
      const employee = await this.employeeModel.findOne({
        email: employeeData.email,
      });

      if (!employee) {
        const { BACKEND_BCRYPT_SALT } = process.env;
        employeeData.password = await bcrypt.hash(
          employeeData.password,
          BACKEND_BCRYPT_SALT
        );
        const createdEmployee = new this.employeeModel({
          ...employeeData,
        });
        const savedEmployee: Employee = await createdEmployee.save();

        response.send(savedEmployee);
      } else {
        next(new EmployeeAlreadyExistsException(employeeData.email));
      }
    } catch {
      next(
        new HttpException(500, "Internal Server Error: Create Employee Error")
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
      next(
        new HttpException(500, "Internal Server Error: Delete Employee Error")
      );
    }
  };
}

export default EmployeeService;
