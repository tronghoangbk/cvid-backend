import express from "express";
import { getAll, createMany } from "../controllers/school.controller";
const schoolRouter = express.Router();

schoolRouter.get("/getall", getAll);
schoolRouter.post("/create-many", createMany);

export default schoolRouter;
