import * as bcrypt from "bcrypt";
import HttpException from "../providers/exceptions/general/http.exception";
import UserModel from "../modules/users/user.model";

const SeedAdminUserData = async () => {
  try {
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
      role: "admin",
      password: hash,
    });

    await adminUser.save();
  } catch {
    throw new HttpException(
      500,
      "Internal Server Error: Seeding Admin Data Error"
    );
  }
};

export default SeedAdminUserData;
