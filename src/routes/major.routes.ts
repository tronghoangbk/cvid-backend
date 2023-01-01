import express from "express";
import {
	getAll,
	createMany,
	getListLevel,
	getListMajorByLevel,
	getAllListMajor,
} from "../controllers/major.controller";
const Router = express.Router();

Router.get("/getall", getAll);
Router.post("/create-many", createMany);
Router.get("/get-list-level", getListLevel);
Router.get("/get-list-major-by-level/:level", getListMajorByLevel);
Router.get("/get-all-list-major", getAllListMajor);

export default Router;
