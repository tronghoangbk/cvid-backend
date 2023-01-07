import express from "express";
import { getAll, createMany } from "../controllers/environment.controller";
const Router = express.Router();

Router.get("/getall", getAll);
Router.post("/create-many", createMany);

export default Router;