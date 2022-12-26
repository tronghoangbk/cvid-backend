import express from "express";
import { getAll } from "../controllers/industry.controller";
const Router = express.Router();

Router.get("/getall", getAll);

export default Router;
