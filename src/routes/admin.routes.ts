import express from "express";
import {
	confirmResume,
	cancelConfirmResume,
	getRole,
	login,
	notConfirmResume,
	confirmCompany,
	cancelConfirmCompany,
	notConfirmCompany,
	confirmJob,
	cancelConfirmJob,
	notConfirmJob,
	
} from "../controllers/admin.controller";
import { checkLogin } from "../middleware/other.middleware";
const Router = express.Router();

Router.post("/confirm-resume/:id/:times", checkLogin, confirmResume);
Router.post("/cancel-confirm-resume/:id/:times", checkLogin, cancelConfirmResume);
Router.post("/not-confirm-resume/:id/:times", checkLogin, notConfirmResume);

Router.post("/confirm-company/:id/:times", checkLogin, confirmCompany);
Router.post("/cancel-confirm-company/:id/:times", checkLogin, cancelConfirmCompany);
Router.post("/not-confirm-company/:id/:times", checkLogin, notConfirmCompany);

Router.post("/confirm-job/:id/:times", checkLogin, confirmJob);
Router.post("/cancel-confirm-job/:id/:times", checkLogin, cancelConfirmCompany);
Router.post("/not-confirm-job/:id/:times", checkLogin, notConfirmCompany);

Router.post("/confirm-job/:id/:times", checkLogin, confirmJob);
Router.post("/cancel-confirm-job/:id/:times", checkLogin, cancelConfirmJob);
Router.post("/not-confirm-job/:id", checkLogin, notConfirmJob);

Router.get("/get-role", checkLogin, getRole);
Router.post("/login", login);

export default Router;
