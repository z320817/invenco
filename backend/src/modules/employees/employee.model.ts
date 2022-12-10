import * as mongoose from "mongoose";
import Employee from "./employee.interface";
import EmployeeSchema from "./employee.schema";

const EmployeeModel = mongoose.model<Employee & mongoose.Document>(
  "User",
  EmployeeSchema
);

export default EmployeeModel;
