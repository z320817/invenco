import * as mongoose from "mongoose";

const EmployeeAddressSchema = new mongoose.Schema({
  city: String,
  country: String,
  street: String,
});

const EmployeeSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    jobTitle: String,
    address: EmployeeAddressSchema,
    email: String,
    phoneNumber: String,
    password: {
      type: String,
      get: (): undefined => undefined,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

EmployeeSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

EmployeeSchema.virtual("contacts").get(function () {
  return {
    email: this.email,
    phoneNumber: this.phoneNumber,
    address: this.address,
  };
});

export default EmployeeSchema;
