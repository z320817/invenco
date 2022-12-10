import "dotenv/config";

import App from "./app";
import EmployeesController from "./modules/employees/employee.controller";
import AuthController from "./modules/auth/auth.controller";
import CheckEnvironment from "./utils/environment.util";
import SeedAdminUserData from "./utils/seed-admin-user.util";

CheckEnvironment();
SeedAdminUserData();

const app = new App(
  [new EmployeesController(), new AuthController()],
  process.env.BACKEND_PORT
);

app.listen();
