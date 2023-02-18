import express from "express";
import { createJob, getJobForDepartment } from "../controllers/job.controller";
import { createDepartment } from "../controllers/department.controller";
import { checkInput, checkLogin } from "../middleware/other.middleware";
const Router = express.Router();

Router.post("/create", checkLogin, createJob);
Router.get("/get-job-for-department/:departmentId/:key", getJobForDepartment);
Router.post("/create-department", checkLogin, createDepartment);

export default Router;
