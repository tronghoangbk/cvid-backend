"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const other_middleware_1 = require("../middleware/other.middleware");
const Router = express_1.default.Router();
Router.post("/confirm-resume/:id/:times", other_middleware_1.checkLogin, admin_controller_1.confirmResume);
Router.post("/cancel-confirm-resume/:id/:times", other_middleware_1.checkLogin, admin_controller_1.cancelConfirmResume);
Router.post("/not-confirm-resume/:id/:times", other_middleware_1.checkLogin, admin_controller_1.notConfirmResume);
Router.post("/confirm-company/:id/:times", other_middleware_1.checkLogin, admin_controller_1.confirmCompany);
Router.post("/cancel-confirm-company/:id/:times", other_middleware_1.checkLogin, admin_controller_1.cancelConfirmCompany);
Router.post("/not-confirm-company/:id/:times", other_middleware_1.checkLogin, admin_controller_1.notConfirmCompany);
Router.get("/get-role", other_middleware_1.checkLogin, admin_controller_1.getRole);
Router.post("/login", admin_controller_1.login);
exports.default = Router;
