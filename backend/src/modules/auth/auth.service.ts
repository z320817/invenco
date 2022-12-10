import { sign } from "jsonwebtoken";
import User from "modules/users/user.interface";

class AuthService {
  constructor() {}

  public createToken(user: User): { token: string } {
    const expiresInOneHour = 60 * 60;
    const secret = process.env.BACKEND_JWT_SECRET;
    const dataStoredInToken = {
      id: user.id,
      expiresIn: expiresInOneHour,
      role: user.role,
    };

    return {
      token: sign(dataStoredInToken, secret, {
        expiresIn: expiresInOneHour,
      }),
    };
  }
}

export default AuthService;
