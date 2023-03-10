import express from "express";
import { body } from "express-validator";
import {
	login,
	register,
	verifyEmail,
	verified,
	getMyReSume,
	getAllEmployee,
	getEmployeeById,
	getEmployeeCount,
	addSchool,
	deleteSchool,
	sendOTP,
	confirmPhone,
	addShortTraining,
	deleteShortTraining,
	addWorkExperience,
	deleteWorkExperience,
	findJob,
	getCountResume,
	updatePoint,
	confirmJob
} from "../controllers/employee.controller";
import { checkInput, checkLogin } from "../middleware/other.middleware";
const employeeRouter = express.Router();

employeeRouter.post("/login", body("username").notEmpty(), body("password").notEmpty(), checkInput, login);
employeeRouter.post("/register", register);
employeeRouter.get("/get-my-resume", checkLogin, getMyReSume);
employeeRouter.post("/logout");
employeeRouter.get("/verify-email/:id", verifyEmail);
employeeRouter.get("/verified", verified);
employeeRouter.post("/forgot-password");
employeeRouter.post("/reset-password");
employeeRouter.post("/change-password");
employeeRouter.get("/get-all", getAllEmployee);
employeeRouter.get("/get-by-id/:id", getEmployeeById);
employeeRouter.get("/get-count", getEmployeeCount);
employeeRouter.post("/add-school/:id", addSchool);
employeeRouter.delete("/delete-school/:id/:schoolId", checkLogin, deleteSchool);
employeeRouter.post("/add-short-training/:id", checkLogin, addShortTraining);
employeeRouter.delete("/delete-short-training/:id/:shortTrainingId", checkLogin, deleteShortTraining);
employeeRouter.post("/add-work-experience/:id", checkLogin, addWorkExperience);
employeeRouter.delete("/delete-work-experience/:id/:workId", checkLogin, deleteWorkExperience);
employeeRouter.post("/send-otp/:id", checkLogin, body("phone").notEmpty(), checkInput, sendOTP);
employeeRouter.post("/confirm-phone/:id", checkLogin, body("otp").notEmpty(), checkInput, confirmPhone);
employeeRouter.put("/update-point/:id", checkLogin, updatePoint);
employeeRouter.post("/find-job/:id", findJob);
employeeRouter.post("/confirm-job/:orderId", checkLogin, confirmJob);
// laays so luong nhan vien
employeeRouter.get("/get-count-employee", getCountResume);

employeeRouter.post("/update");
employeeRouter.post("/delete");

export default employeeRouter;
