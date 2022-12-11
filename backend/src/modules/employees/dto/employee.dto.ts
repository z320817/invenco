import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from "class-validator";

class CreateEmployeeDTO {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public jobTitle: string;

  @IsNotEmpty()
  public address: EmployeeAddressDTO;

  @IsEmail()
  public email: string;

  @IsPhoneNumber()
  public phoneNumber: string;

  @IsString()
  public password: string;
}

class EmployeeAddressDTO {
  @IsString()
  public city: string;

  @IsString()
  public country: string;

  @IsString()
  public street: string;
}

export default CreateEmployeeDTO;
