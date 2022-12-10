import HttpException from "../http.exception";

class UserNotFound extends HttpException {
  constructor(id: string) {
    super(404, `User with id ${id} not found`);
  }
}

export default UserNotFound;
