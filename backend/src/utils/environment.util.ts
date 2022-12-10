import { cleanEnv, str } from "envalid";

const CheckEnvironment = () => {
  cleanEnv(process.env, {
    BACKEND_PORT: str(),
    BACKEND_JWT_SECRET: str(),
    DATABASE_USER: str(),
    DATABASE_PASSWORD: str(),
    MONGO_HOST: str(),
    MONGO_PORT: str(),
    MONGO_INITDB_DATABASE: str(),
  });
};

export default CheckEnvironment;
