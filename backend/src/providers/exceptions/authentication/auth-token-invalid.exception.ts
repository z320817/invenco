import HttpException from "../http.exception";

class AuthenticationTokenInvalid extends HttpException {
  constructor() {
    super(401, "Invalid authentication token");
  }
}

export default AuthenticationTokenInvalid;
