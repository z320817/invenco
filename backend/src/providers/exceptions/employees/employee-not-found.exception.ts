import HttpException from "../general/http.exception";

class EmployeeNotFound extends HttpException {
  constructor(id: string) {
    super(404, `Employee with id ${id} not found`);
  }
}

export default EmployeeNotFound;
