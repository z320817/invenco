import HttpException from "../http.exception";

class AuthenticationTokenMissing extends HttpException {
  constructor() {
    super(401, "Authentication token is missing");
  }
}

export default AuthenticationTokenMissing;
