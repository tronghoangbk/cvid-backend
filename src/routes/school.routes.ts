import express from "express";
import {getAll} from "../controllers/school.controller";
const schoolRouter = express.Router();

schoolRouter.get("/getall", getAll);

export default schoolRouter;