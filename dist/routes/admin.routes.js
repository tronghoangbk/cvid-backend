"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const Router = express_1.default.Router();
Router.post("/confirm-resume/:id/:times", admin_controller_1.confirmResume);
// Router.post("/cancel-resume/:id/:times", cancelResume);
exports.default = Router;
