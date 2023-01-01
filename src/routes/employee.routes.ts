import express from "express";
import { body } from "express-validator";
import { login, register, verifyEmail, verified } from "../controllers/employee.controller";
import { checkInput } from "../middleware/other.middleware";
const employeeRouter = express.Router();

employeeRouter.post("/login", body("username").notEmpty(), body("password").notEmpty(), checkInput, login);
employeeRouter.post("/register", register);
employeeRouter.post("/logout");
employeeRouter.put("/verify-email", verifyEmail);
employeeRouter.get("/verified", verified);

export default employeeRouter;
