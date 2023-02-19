"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const department_controller_1 = require("../controllers/department.controller");
const other_middleware_1 = require("../middleware/other.middleware");
const Router = express_1.default.Router();
Router.post("/create", other_middleware_1.checkLogin, department_controller_1.createDepartment);
Router.get("/get-department-for-company/:companyId", department_controller_1.getDepartmentForCompany);
Router.get("/get-department-by-key/:key", department_controller_1.getDepartmentByKey);
exports.default = Router;
