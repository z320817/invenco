import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";

interface User {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: {
      type: String,
      get: (): undefined => undefined,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const UserModel = mongoose.model<User & mongoose.Document>("User", UserSchema);

const SeedAdminUserData = async () => {
  const {
    ME_CONFIG_BASICAUTH_USERNAME,
    ME_CONFIG_BASICAUTH_PASSWORD,
    BACKEND_BCRYPT_SALT,
  } = process.env;

  const hash = await bcrypt.hash(
    ME_CONFIG_BASICAUTH_PASSWORD,
    BACKEND_BCRYPT_SALT
  );

  const adminUser = new UserModel({
    email: ME_CONFIG_BASICAUTH_USERNAME,
    password: hash,
  });

  await adminUser.save();
};

export default SeedAdminUserData;
