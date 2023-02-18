"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const orderRouter = express_1.default.Router();
orderRouter.post("/create", order_controller_1.createOrder);
orderRouter.post("/get-order-by-employee-id/employeeId/:employeeId", order_controller_1.getOrdersByEmployee);
exports.default = orderRouter;
