import "dotenv/config";
import CheckEnvironment from "./utils/environment.util";
import App from "./app";
import UsersController from "./controllers/users/users.controller";

CheckEnvironment();

const app = new App([new UsersController()], process.env.PORT);

app.listen();
