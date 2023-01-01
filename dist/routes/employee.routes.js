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
employeeRouter.post("/logout");
employeeRouter.put("/verify-email", employee_controller_1.verifyEmail);
employeeRouter.get("/verified", employee_controller_1.verified);
exports.default = employeeRouter;
