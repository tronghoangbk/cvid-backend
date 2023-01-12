"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const employee_controller_1 = require("../controllers/employee.controller");
const other_middleware_1 = require("../middleware/other.middleware");
const employeeRouter = express_1.default.Router();
employeeRouter.post("/login", (0, express_validator_1.body)("username").notEmpty(), (0, express_validator_1.body)("password").notEmpty(), other_middleware_1.checkInput, employee_controller_1.login);
employeeRouter.post("/register", employee_controller_1.register);
employeeRouter.get("/get-my-resume", other_middleware_1.checkLogin, employee_controller_1.getMyReSume);
employeeRouter.post("/logout");
employeeRouter.get("/verify-email/:id", employee_controller_1.verifyEmail);
employeeRouter.get("/verified", employee_controller_1.verified);
employeeRouter.post("/forgot-password");
employeeRouter.post("/reset-password");
employeeRouter.post("/change-password");
employeeRouter.get("/get-all", other_middleware_1.checkLogin, employee_controller_1.getAllEmployee);
employeeRouter.get("/get-by-id/:id", employee_controller_1.getEmployeeById);
employeeRouter.get("/get-count", employee_controller_1.getEmployeeCount);
employeeRouter.post("/add-school/:id", employee_controller_1.addSchool);
employeeRouter.delete("/delete-school/:id/:schoolId", other_middleware_1.checkLogin, employee_controller_1.deleteSchool);
employeeRouter.post("/add-short-training/:id", other_middleware_1.checkLogin, employee_controller_1.addShortTraining);
employeeRouter.delete("/delete-short-training/:id/:shortTrainingId", other_middleware_1.checkLogin, employee_controller_1.deleteShortTraining);
employeeRouter.post("/add-work-experience/:id", other_middleware_1.checkLogin, employee_controller_1.addWorkExperience);
employeeRouter.delete("/delete-work-experience/:id/:workId", other_middleware_1.checkLogin, employee_controller_1.deleteWorkExperience);
employeeRouter.post("/send-otp/:id", other_middleware_1.checkLogin, (0, express_validator_1.body)("phone").notEmpty(), other_middleware_1.checkInput, employee_controller_1.sendOTP);
employeeRouter.post("/confirm-phone/:id", other_middleware_1.checkLogin, (0, express_validator_1.body)("otp").notEmpty(), other_middleware_1.checkInput, employee_controller_1.confirmPhone);
employeeRouter.post("/find-job/:id", employee_controller_1.findJob);
employeeRouter.post("/update");
employeeRouter.post("/delete");
exports.default = employeeRouter;
