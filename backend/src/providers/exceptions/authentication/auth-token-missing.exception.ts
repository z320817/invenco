import HttpException from "../general/http.exception";

class AuthenticationTokenMissing extends HttpException {
  constructor() {
    super(401, "Authentication token is missing");
  }
}

export default AuthenticationTokenMissing;
