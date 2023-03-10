import express from "express";
import {
	login,
	register,
	verifyEmail,
	verified,
	getAllCompany,
	getCompanyById,
	getInfoCompanyFromUri,
	getMyCompanyInfo,
	getCompanyCount,
	createJobForDepartment,
	deleteJobForDepartment,
} from "../controllers/company.controller";
import { checkInput, checkLogin } from "../middleware/other.middleware";
const Router = express.Router();
Router.post("/register", register);
Router.post("/login", login);
Router.get("/verify-email/:id", verifyEmail);
Router.get("/verified", verified);
Router.get("/get-all", getAllCompany);
Router.get("/get-by-id", getCompanyById);
Router.get("/get-info-by-mst/:id", getInfoCompanyFromUri);
Router.get("/get-my-info", checkLogin, getMyCompanyInfo);
Router.post("/create-job-for-department/:key", createJobForDepartment);
Router.delete("/delete-job-for-department/:key/:jobId", deleteJobForDepartment);
Router.get("/get-count", getCompanyCount);
Router.get("/forgot-password");
Router.get("/reset-password");
Router.get("/change-password");
Router.get("/update");
Router.get("/delete");

export default Router;
