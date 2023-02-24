import express from "express";
import { body } from "express-validator";
import { checkLogin } from "../middleware/other.middleware";
import {
	createOrder,
	getOrdersByEmployee,
	getOrdersByDepartment,
	updateInterview,
} from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/create", checkLogin, createOrder);
orderRouter.post("/get-order-for-employee", checkLogin, getOrdersByEmployee);
orderRouter.post("/get-order-for-department/:key", getOrdersByDepartment);
orderRouter.put("/update-interview/:key/:id", updateInterview);

export default orderRouter;
