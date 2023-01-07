"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_controller_1 = require("../controllers/environment.controller");
const Router = express_1.default.Router();
Router.get("/getall", environment_controller_1.getAll);
Router.post("/create-many", environment_controller_1.createMany);
exports.default = Router;
