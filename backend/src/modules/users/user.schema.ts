import * as mongoose from "mongoose";

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

export default UserSchema;
