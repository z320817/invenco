import HttpException from "../general/http.exception";

class AuthenticationCredentialsInvalid extends HttpException {
  constructor() {
    super(401, "Invalid authentication credentials");
  }
}

export default AuthenticationCredentialsInvalid;
