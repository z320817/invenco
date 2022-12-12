import * as request from "supertest";
import mongoose from "mongoose";
import RemoveAdminUserData from "../../../utils/remove-admin-user.util";
import SeedAdminUserData from "../../../utils/seed-admin-user.util";
import server from "../../../server";

describe("POST, GET, PATCH, DELETE /*", () => {
  beforeAll(async () => {
    await SeedAdminUserData();
    const { ME_CONFIG_BASICAUTH_USERNAME, ME_CONFIG_BASICAUTH_PASSWORD } =
      process.env;
    const response = await request(server.app).post("/auth/login").send({
      email: ME_CONFIG_BASICAUTH_USERNAME,
      password: ME_CONFIG_BASICAUTH_PASSWORD,
    });
  });

  it("should return forbidden exception on any route other then registered", async () => {
    const responceForbiddenPost = await request(server.app).post("/123");
    const responceForbiddenGet = await request(server.app).get("/123");
    const responceForbiddenPatch = await request(server.app).patch("/123");
    const responceForbiddenDelete = await request(server.app).delete("/123");

    expect(responceForbiddenPost.statusCode).toBe(403);
    expect(responceForbiddenGet.statusCode).toBe(403);
    expect(responceForbiddenPatch.statusCode).toBe(403);
    expect(responceForbiddenDelete.statusCode).toBe(403);
    expect.assertions(4);
  });
});

afterAll(async () => {
  await RemoveAdminUserData();
  await mongoose.connection.close();
  server.server.close();
});
