import mongoose from "mongoose";
import * as request from "supertest";
import server from "../../../server";

describe("POST /auth/login", () => {
  it("should log in with admin credentials", async () => {
    const { ME_CONFIG_BASICAUTH_USERNAME, ME_CONFIG_BASICAUTH_PASSWORD } =
      process.env;
    const res = await request(server.app).post("/auth/login").send({
      email: ME_CONFIG_BASICAUTH_USERNAME,
      password: ME_CONFIG_BASICAUTH_PASSWORD,
    });
    expect(res.statusCode).toBe(200);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.server.close();
});
