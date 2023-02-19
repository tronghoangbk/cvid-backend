import express from "express";
import { body } from "express-validator";
import { createOrder, getOrdersByEmployee, getOrdersByCompany } from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.post("/get-order-by-employee-id/employeeId/:employeeId", getOrdersByEmployee);
orderRouter.post("/get-order-by-company-id/companyId/:companyId", getOrdersByCompany);

export default orderRouter;
