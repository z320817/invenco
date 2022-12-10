import "dotenv/config";
import App from "./app";
import EmployeesController from "./modules/employees/employee.controller";
import CheckEnvironment from "./utils/environment.util";
import SeedAdminUserData from "utils/seed-admin-user.util";

CheckEnvironment();
SeedAdminUserData();

const app = new App([new EmployeesController()], process.env.BACKEND_PORT);

app.listen();
