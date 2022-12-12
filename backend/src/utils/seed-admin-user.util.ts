import * as bcrypt from "bcrypt";
import ConnectToTheDatabase from "../providers/db-connection/db-connection.provider";
import HttpException from "../providers/exceptions/general/http.exception";
import UserModel from "../modules/users/user.model";

const SeedAdminUserData = async () => {
  try {
    const {
      ME_CONFIG_BASICAUTH_USERNAME,
      ME_CONFIG_BASICAUTH_PASSWORD,
    } = process.env;

    await ConnectToTheDatabase();

    const user = await UserModel.findOne({
      email: ME_CONFIG_BASICAUTH_USERNAME,
    });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(
        ME_CONFIG_BASICAUTH_PASSWORD,
        salt
      );

      const adminUser = new UserModel({
        email: ME_CONFIG_BASICAUTH_USERNAME,
        role: "admin",
        password: hash,
      });

      await adminUser.save();
    }
  } catch {
    throw new HttpException(
      500,
      "Internal Server Error: Seeding Admin Data Error"
    );
  }
};

export default SeedAdminUserData;
