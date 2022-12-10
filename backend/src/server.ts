import "dotenv/config";
import CheckEnvironment from "./utils/environment.util";
import App from "./app";
import EmployeesController from "./modules/employees/employee.controller";

CheckEnvironment();

const app = new App([new EmployeesController()], process.env.BACKEND_PORT);

app.listen();
