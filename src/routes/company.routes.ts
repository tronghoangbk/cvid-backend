import express from "express";
import {
	login,
	register,
	verifyEmail,
	verified,
	getAllCompany,
	getCompanyById,
	getInfoCompanyFromUri
} from "../controllers/company.controller";
const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);
Router.get("/logout");
Router.get("/verify-email/:id", verifyEmail);
Router.get("/verified", verified);
Router.get("/forgot-password");
Router.get("/reset-password");
Router.get("/change-password");
Router.get("/get-all", getAllCompany);
Router.get("/get-by-id", getCompanyById);
Router.get('/get-info-by-mst/:id', getInfoCompanyFromUri);
Router.get("/update");
Router.get("/delete");

export default Router;
