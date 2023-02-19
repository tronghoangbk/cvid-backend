import express from "express";
import {
	createJob,
	getAllJob,
	getJobForDepartment,
	getEmployeeForJob,
	gẹtJobDetail,
} from "../controllers/job.controller";
import { createDepartment } from "../controllers/department.controller";
import { checkInput, checkLogin, checkAdmin } from "../middleware/other.middleware";
const Router = express.Router();

Router.post("/create", checkLogin, createJob);
Router.get("/get-job-for-department/:departmentId/:key", getJobForDepartment);
Router.post("/create-department", checkLogin, createDepartment);
Router.get("/get-all", checkAdmin, getAllJob);
Router.post("/get-employee-for-job/:jobId", getEmployeeForJob);
Router.get("/get-job-detail/:id", gẹtJobDetail);


export default Router;
