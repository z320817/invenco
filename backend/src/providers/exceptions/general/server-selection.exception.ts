import HttpException from "./http.exception";

class ServerSelectionError extends HttpException {
  constructor() {
    super(400, `Connection timed out`);
  }
}

export default ServerSelectionError;
