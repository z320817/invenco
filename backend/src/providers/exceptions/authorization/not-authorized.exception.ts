import HttpException from "../general/http.exception";

class NotAuthorized extends HttpException {
  constructor() {
    super(403, "Action is not authorized");
  }
}

export default NotAuthorized;
