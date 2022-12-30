"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { getAll, createMany } from "../controllers/environment.controller";
const Router = express_1.default.Router();
// Router.get("/getall", getAll);
// Router.post("/create-many", createMany);
exports.default = Router;
