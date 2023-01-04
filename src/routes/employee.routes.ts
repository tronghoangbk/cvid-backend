import express from "express";
import { body } from "express-validator";
import { login, register, verifyEmail, verified, getMyReSume, getAllEmployee, getEmployeeById } from "../controllers/employee.controller";
import { checkInput, checkLogin } from "../middleware/other.middleware";
const employeeRouter = express.Router();

employeeRouter.post("/login", body("username").notEmpty(), body("password").notEmpty(), checkInput, login);
employeeRouter.post("/register", register);
employeeRouter.get("/get-my-resume", checkLogin, getMyReSume)
employeeRouter.post("/logout");
employeeRouter.get("/verify-email/:id", verifyEmail);
employeeRouter.get("/verified", verified);
employeeRouter.post("/forgot-password");
employeeRouter.post("/reset-password");
employeeRouter.post("/change-password");
employeeRouter.post("/get-all", checkLogin, getAllEmployee);
employeeRouter.post("/get-by-id", getEmployeeById);
employeeRouter.post("/update");
employeeRouter.post("/delete");


export default employeeRouter;
