import express from "express";
import { body } from "express-validator";
import { createOrder, getOrdersByEmployee, getOrdersByCompany } from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/get-order-by-employee-id/employeeId/:employeeId", getOrdersByEmployee);

export default orderRouter;
