import express from "express";
import { confirmResume } from "../controllers/admin.controller";
const Router = express.Router();

Router.post("/confirm-resume/:id/:times", confirmResume);
// Router.post("/cancel-resume/:id/:times", cancelResume);

export default Router;