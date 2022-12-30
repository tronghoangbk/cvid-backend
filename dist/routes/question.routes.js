"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const question_controller_1 = require("../controllers/question.controller");
const Router = express_1.default.Router();
Router.get("/getall", question_controller_1.getAll);
Router.post("/create-many", question_controller_1.createMany);
exports.default = Router;
