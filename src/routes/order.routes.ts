import express from "express";
import { body } from "express-validator";
import { checkLogin } from "../middleware/other.middleware";
import { createOrder, getOrdersByEmployee, getOrdersByCompany } from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/create", checkLogin, createOrder);
orderRouter.get("/get-order-for-employee", checkLogin, getOrdersByEmployee);
orderRouter.post("/get-order-by-company-id/companyId/:companyId", getOrdersByCompany);

export default orderRouter;
