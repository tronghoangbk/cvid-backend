import express from "express";
import { body } from "express-validator";
import { login, register, verifyEmail, verified, getMyReSume } from "../controllers/employee.controller";
import { checkInput, checkLogin } from "../middleware/other.middleware";
const employeeRouter = express.Router();

employeeRouter.post("/login", body("username").notEmpty(), body("password").notEmpty(), checkInput, login);
employeeRouter.post("/register", register);
employeeRouter.get("/get-my-resume", checkLogin, getMyReSume)
employeeRouter.post("/logout");
employeeRouter.get("/verify-email/:id", verifyEmail);
employeeRouter.get("/verified", verified);

export default employeeRouter;
