"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const other_middleware_1 = require("../middleware/other.middleware");
const order_controller_1 = require("../controllers/order.controller");
const orderRouter = express_1.default.Router();
orderRouter.post("/create", other_middleware_1.checkLogin, order_controller_1.createOrder);
orderRouter.get("/get-order-for-employee", other_middleware_1.checkLogin, order_controller_1.getOrdersByEmployee);
orderRouter.post("/get-order-by-company-id/companyId/:companyId", order_controller_1.getOrdersByCompany);
exports.default = orderRouter;
