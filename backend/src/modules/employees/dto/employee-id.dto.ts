import { IsString } from "class-validator";

class EmployeeIdDTO {
  @IsString()
  public id: string;
}

export default EmployeeIdDTO;
