import { IsString } from "class-validator";

class AuthDTO {
  @IsString()
  public email: string;

  @IsString()
  public password: string;
}

export default AuthDTO;
