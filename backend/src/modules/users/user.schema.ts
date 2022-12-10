import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  role: String,
  password: String,
});

export default UserSchema;
