import jwt from "@elysiajs/jwt";
import { Elysia } from "elysia";
import { fallbackRoute } from "./api/v1/fallback";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
  login,
  updateSelfProfile,
  verifyToken,
} from "./api/v1/user";
import { connectToDatabase } from "./utils";
const app = new Elysia()
  .use(
    jwt({
      name: "userToken", // The name under which JWT is registered in the context
      secret: process.env.JWT_SECRET!, // Ensure the JWT secret is set correctly
    }),
  )
  .get("/", () => "TEST COMPLETE")

  // Public Routes (No JWT Verification)
  .post("/api/v1/register", createUser)
  .post("/api/v1/login", login)
  .get("/api/v1/user/:username", getUser)
  .get("/api/v1/userid/:id", getUserById)
  .put("/api/v1/user/update", updateSelfProfile)
  .delete("/api/v1/user/delete", deleteUser)
  .get("/api/v1/*", fallbackRoute)
  .post("/api/v1/verify-token", verifyToken)
  .listen(process.env.PORT!);

connectToDatabase();

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
