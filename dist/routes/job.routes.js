"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const job_controller_1 = require("../controllers/job.controller");
const other_middleware_1 = require("../middleware/other.middleware");
const Router = express_1.default.Router();
Router.post("/create", other_middleware_1.checkLogin, job_controller_1.createJob);
Router.get("/get-job-for-department/:departmentId", job_controller_1.getJobForDepartment);
exports.default = Router;
