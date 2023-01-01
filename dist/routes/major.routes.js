"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const major_controller_1 = require("../controllers/major.controller");
const Router = express_1.default.Router();
Router.get("/getall", major_controller_1.getAll);
Router.post("/create-many", major_controller_1.createMany);
Router.get("/get-list-level", major_controller_1.getListLevel);
Router.get("/get-list-major-by-level/:level", major_controller_1.getListMajorByLevel);
Router.get("/get-all-list-major", major_controller_1.getAllListMajor);
exports.default = Router;
