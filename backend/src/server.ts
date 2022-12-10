import "dotenv/config";
import CheckEnvironment from "./utils/environment.util";
import App from "./app";
import UsersController from "./modules/users/users.controller";

CheckEnvironment();

const app = new App([new UsersController()], process.env.BACKEND_PORT);

app.listen();
