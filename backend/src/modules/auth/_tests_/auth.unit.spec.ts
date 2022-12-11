import * as request from "supertest";
import mongoose from "mongoose";
import RemoveAdminUserData from "../../../utils/remove-admin-user.util";
import SeedAdminUserData from "../../../utils/seed-admin-user.util";
import server from "../../../server";

describe("POST /auth/login", () => {
  beforeAll(async () => {
    await SeedAdminUserData();
  });

  it("should fail to log in with wrong credentials", async () => {
    const { ME_CONFIG_BASICAUTH_USERNAME } = process.env;
    const responce = await request(server.app).post("/auth/login").send({
      email: ME_CONFIG_BASICAUTH_USERNAME,
      password: 12345,
    });

    expect(responce.statusCode).toBe(400);
  });

  it("should log in with correct credentials", async () => {
    const { ME_CONFIG_BASICAUTH_USERNAME, ME_CONFIG_BASICAUTH_PASSWORD } =
      process.env;
    const responce = await request(server.app).post("/auth/login").send({
      email: ME_CONFIG_BASICAUTH_USERNAME,
      password: ME_CONFIG_BASICAUTH_PASSWORD,
    });

    expect(responce.statusCode).toBe(200);
  });

  it("should issue token with correct credentials", async () => {
    const { ME_CONFIG_BASICAUTH_USERNAME, ME_CONFIG_BASICAUTH_PASSWORD } =
      process.env;
    const responce = await request(server.app).post("/auth/login").send({
      email: ME_CONFIG_BASICAUTH_USERNAME,
      password: ME_CONFIG_BASICAUTH_PASSWORD,
    });

    expect(responce.body.token).toEqual(expect.any(String));
  });
});

afterAll(async () => {
  await RemoveAdminUserData();
  await mongoose.connection.close();
  server.server.close();
});
