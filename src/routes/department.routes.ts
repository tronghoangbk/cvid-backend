import express from "express";
import { createDepartment, getDepartmentForCompany, getDepartmentByKey } from "../controllers/department.controller";
import { checkInput, checkLogin } from "../middleware/other.middleware";
const Router = express.Router();

Router.post("/create", checkLogin, createDepartment);
Router.get("/get-department-for-company/:companyId", getDepartmentForCompany);
Router.get("/get-department-by-key/:key", getDepartmentByKey);
export default Router;
