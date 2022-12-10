import { cleanEnv, str } from "envalid";

const CheckEnvironment = () => {
  cleanEnv(process.env, {
    BACKEND_PORT: str(),
  });
};

export default CheckEnvironment;
