import * as request from "supertest";
import mongoose from "mongoose";
import RemoveAdminUserData from "../../../utils/remove-admin-user.util";
import SeedAdminUserData from "../../../utils/seed-admin-user.util";
import server from "../../../server";

describe("POST, GET, PATCH, DELETE /employee", () => {
  let token = "";

  beforeAll(async () => {
    await SeedAdminUserData();
    const { ME_CONFIG_BASICAUTH_USERNAME, ME_CONFIG_BASICAUTH_PASSWORD } =
      process.env;
    const response = await request(server.app).post("/auth/login").send({
      email: ME_CONFIG_BASICAUTH_USERNAME,
      password: ME_CONFIG_BASICAUTH_PASSWORD,
    });
    token = response.body.token;
  });

  it("should get list of all employees for authenticated user", async () => {
    const responce = await request(server.app)
      .get("/employee")
      .set("Authorization", `Bearer ${token}`);

    expect(responce.statusCode).toBe(200);
  });

  it("not authenticated user should not able to create, update or delete employees", async () => {
    const getId = await request(server.app)
      .post("/employee")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "Shulman",
        lastName: "Yosef",
        jobTitle: "Employee",
        address: {
          city: "Hadera",
          country: "Israel",
          street: "Frank 15",
        },
        email: "yosef.shulman@protonmail.com",
        phoneNumber: "+972536373237",
        password: "12345",
      });
    const id = getId.body.id;

    const unAuthenticatedCreateResponse = await request(server.app)
      .post("/employee")
      .send({
        firstName: "Shulman",
        lastName: "Yosef",
        jobTitle: "Employee",
        address: {
          city: "Hadera",
          country: "Israel",
          street: "Frank 15",
        },
        email: "yosef.shulman@protonmail.com",
        phoneNumber: "+972536373237",
        password: "12345",
      });

    const unAuthenticatedUpdateResponse = await request(server.app)
      .patch(`/employee/${id}`)
      .send({
        firstName: "New",
        lastName: "Name",
      });

    const unAuthenticatedGetByIdResponse = await request(server.app).get(
      `/employee/${id}`
    );

    const unAuthenticatedDeleteResponse = await request(server.app).delete(
      `/employee/${id}`
    );

    expect(unAuthenticatedCreateResponse.statusCode).toBe(401);
    expect(unAuthenticatedUpdateResponse.statusCode).toBe(401);
    expect(unAuthenticatedGetByIdResponse.statusCode).toBe(401);
    expect(unAuthenticatedDeleteResponse.statusCode).toBe(401);
    expect.assertions(4);
  });

  it("authenticated user should be able to create, update and delete employees", async () => {
    const createResponse = await request(server.app)
      .post("/employee")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "Shulman",
        lastName: "Yosef",
        jobTitle: "Employee",
        address: {
          city: "Hadera",
          country: "Israel",
          street: "Frank 15",
        },
        email: "test.employee@invenco.com",
        phoneNumber: "+972536373237",
        password: "12345",
      });
    const id = createResponse.body.id;

    const updateResponse = await request(server.app)
      .patch(`/employee/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "New",
        lastName: "Name",
      });

    const getByIdResponse = await request(server.app)
      .get(`/employee/${id}`)
      .set("Authorization", `Bearer ${token}`);

    const deleteResponse = await request(server.app)
      .delete(`/employee/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(createResponse.statusCode).toBe(200);
    expect(createResponse.body.id).toEqual(expect.any(String));
    expect(updateResponse.body.fullName).toEqual("New Name");
    expect(getByIdResponse.statusCode).toBe(200);
    expect(deleteResponse.statusCode).toBe(200);
    expect.assertions(5);
  });
});

afterAll(async () => {
  await RemoveAdminUserData();
  await mongoose.connection.close();
  server.server.close();
});
