import * as bcrypt from "bcrypt";
import UserModel from "modules/users/user.model";

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
