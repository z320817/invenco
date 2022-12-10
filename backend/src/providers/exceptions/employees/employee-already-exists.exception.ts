import HttpException from "../http.exception";

class EmployeeAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(400, `Employee with email ${email} already exists`);
  }
}

export default EmployeeAlreadyExistsException;
