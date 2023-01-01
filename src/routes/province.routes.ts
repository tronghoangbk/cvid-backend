import express from "express";
import { getAll, createMany, getListProvince, getListDistrict, getListWard } from "../controllers/province.controller";
const Router = express.Router();

Router.get("/getall", getAll);
Router.post("/create-many", createMany);
Router.get("/get-list-province/", getListProvince);
Router.get("/get-list-district/:province", getListDistrict);
Router.get("/get-list-ward/:province/:district", getListWard);

export default Router;
