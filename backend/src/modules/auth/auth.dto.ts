import { IsEmail, IsString } from "class-validator";

class AuthDTO {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export default AuthDTO;
