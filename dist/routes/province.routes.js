"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const province_controller_1 = require("../controllers/province.controller");
const Router = express_1.default.Router();
Router.get("/getall", province_controller_1.getAll);
Router.post("/create-many", province_controller_1.createMany);
Router.get("/get-list-province/", province_controller_1.getListProvince);
Router.get("/get-list-district/:province", province_controller_1.getListDistrict);
Router.get("/get-list-ward/:province/:district", province_controller_1.getListWard);
exports.default = Router;
