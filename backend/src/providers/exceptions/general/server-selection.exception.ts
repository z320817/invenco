import HttpException from "./http.exception";

class MongoServerSelectionError extends HttpException {
  constructor() {
    super(400, `DB connection timed out`);
  }
}

export default MongoServerSelectionError;
