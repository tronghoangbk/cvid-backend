import { Request, Response } from "express";
import { body } from "express-validator";
import { getListOrderService } from "../services/order.service";
import OrderModel from "../models/order.model";
import {
	createService,
	findOneService,
	findManyService,
	updateOneService,
	deleteOneService,
} from "../services/model.service";

const createOrder = async (req: Request, res: Response) => {
	try {
		const data = req.body;
		console.log(data);
		await createService(OrderModel, data);
		res.status(200).json({ message: "Create orders successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

// Lấy các việc đã chọn cuar userId
const getOrdersByEmployee = async (req: Request, res: Response) => {
	try {
		const { employeeId } = req.params;
		const { sender, status } = req.body;
		let query = { employeeId, sender, status };
		const orders = await getListOrderService(query);
		res.status(200).json({ data: orders, message: "Get all orders successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getOrdersByCompany = async (req: Request, res: Response) => {
	try {
		const { companyId } = req.params;
		const { status } = req.query;
		const orders = await findManyService(OrderModel, { companyId, sender: "company", status });
		res.status(200).json({ data: orders, message: "Get all orders successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export { createOrder, getOrdersByEmployee, getOrdersByCompany };
