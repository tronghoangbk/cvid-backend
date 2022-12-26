import express from "express";
import { body } from "express-validator";
import employeeController from "../controllers/employee.controller";
import { checkInput } from "../middleware/other.middleware";
const employeeRouter = express.Router();

employeeRouter.post(
	"/login",
	body("username").notEmpty(),
	body("password").notEmpty(),
	checkInput,
	employeeController.login,
);

employeeRouter.post("/register", employeeController.register);
employeeRouter.post("/logout");

export default employeeRouter;
