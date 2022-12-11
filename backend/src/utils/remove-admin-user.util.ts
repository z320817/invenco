import HttpException from "../providers/exceptions/general/http.exception";
import UserModel from "../modules/users/user.model";

const RemoveAdminUserData = async () => {
  try {
    const { ME_CONFIG_BASICAUTH_USERNAME } = process.env;

    const user = await UserModel.findOne({
      email: ME_CONFIG_BASICAUTH_USERNAME,
    });

    await user.deleteOne();
  } catch {
    throw new HttpException(
      500,
      "Internal Server Error: Seeding Admin Data Error"
    );
  }
};

export default RemoveAdminUserData;
