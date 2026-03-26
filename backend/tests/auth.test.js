import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { loginUser, registerUser } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

function createResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

test("registerUser creates a user and returns auth payload", async (t) => {
  const req = {
    body: {
      name: "Test User",
      email: "test@example.com",
      password: "Secret@123",
    },
  };
  const res = createResponse();

  t.mock.method(User, "findOne", async () => null);
  t.mock.method(bcrypt, "hash", async () => "hashed-password");
  t.mock.method(User, "create", async (payload) => ({
    _id: "user-1",
    ...payload,
  }));
  t.mock.method(jwt, "sign", () => "signed-token");

  await registerUser(req, res);

  assert.equal(res.statusCode, 201);
  assert.equal(res.body.token, "signed-token");
  assert.equal(res.body.user.email, "test@example.com");
});

test("loginUser rejects invalid credentials", async (t) => {
  const req = {
    body: {
      email: "missing@example.com",
      password: "wrong",
    },
  };
  const res = createResponse();

  t.mock.method(User, "findOne", async () => null);

  await loginUser(req, res);

  assert.equal(res.statusCode, 401);
  assert.equal(res.body.message, "Invalid credentials");
});

test("protect attaches user for a valid bearer token", async (t) => {
  const req = {
    headers: {
      authorization: "Bearer valid-token",
    },
  };
  const res = createResponse();
  let nextCalled = false;

  t.mock.method(jwt, "verify", () => ({ id: "user-1" }));
  t.mock.method(User, "findById", () => ({
    select: async () => ({ _id: "user-1", name: "Tester", email: "tester@example.com" }),
  }));

  await protect(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(req.user.email, "tester@example.com");
});

test("protect rejects missing bearer token", async () => {
  const req = { headers: {} };
  const res = createResponse();

  await protect(req, res, () => {});

  assert.equal(res.statusCode, 401);
  assert.equal(res.body.message, "Not authorized, token missing");
});
