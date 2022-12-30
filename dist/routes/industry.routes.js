"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const industry_controller_1 = require("../controllers/industry.controller");
const Router = express_1.default.Router();
Router.get("/getall", industry_controller_1.getAll);
exports.default = Router;
