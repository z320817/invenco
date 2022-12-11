import "dotenv/config";

import App from "./app";
import EmployeesController from "./modules/employees/employee.controller";
import AuthController from "./modules/auth/auth.controller";
import ForbiddenRoutesController from "./modules/forbidden/forbidden-routes.controller";
import CheckEnvironment from "./utils/environment.util";
import SeedAdminUserData from "./utils/seed-admin-user.util";

CheckEnvironment();
SeedAdminUserData();

const server = new App(
  [
    new EmployeesController(),
    new AuthController(),
    new ForbiddenRoutesController(),
  ],
  process.env.BACKEND_PORT
);

server.listen();

export default server;
