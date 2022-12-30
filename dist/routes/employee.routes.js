"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const employee_controller_1 = __importDefault(require("../controllers/employee.controller"));
const other_middleware_1 = require("../middleware/other.middleware");
const employeeRouter = express_1.default.Router();
employeeRouter.post("/login", (0, express_validator_1.body)("username").notEmpty(), (0, express_validator_1.body)("password").notEmpty(), other_middleware_1.checkInput, employee_controller_1.default.login);
employeeRouter.post("/register", employee_controller_1.default.register);
employeeRouter.post("/logout");
exports.default = employeeRouter;
