import * as mongoose from "mongoose";
import User from "./user.interface";
import UserSchema from "./user.schema";

const UserModel = mongoose.model<User & mongoose.Document>("User", UserSchema);

export default UserModel;
