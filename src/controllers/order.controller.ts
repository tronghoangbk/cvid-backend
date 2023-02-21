import { Request, Response } from "express";
import { body } from "express-validator";
import { checkOrderExistService, getListOrderService } from "../services/order.service";
import OrderModel from "../models/order.model";
import {
	createService,
	findOneService,
	findManyService,
	updateOneService,
	deleteOneService,
} from "../services/model.service";
import { getOneDepartment } from "../services/department.service";
import departmentModel from "../models/department.model";
import jobModel from "../models/job.model";

const createOrder = async (req: Request, res: Response) => {
	try {
		const data: { jobId: string, employeeId: string, sender: string, rating: string, comment: string } = req.body;
		data.sender = req.body.user.role;
		let isExistService = await checkOrderExistService({ jobId: data.jobId, employeeId: data.employeeId });
		if (isExistService) return res.status(400).json({ message: "Order already exist" });
		await createService(OrderModel, data);
		res.status(200).json({ message: "Create orders successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getOrdersByEmployee = async (req: Request, res: Response) => {
	try {
		const employeeId = req.body.user._id;
		const orders = await getListOrderService({ employeeId });
		res.status(200).json({ data: orders, message: "Get all orders successfully" });
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getOrdersByDepartment = async (req: Request, res: Response) => {
	try {
		const { key } = req.params;
		const { sender } = req.body;
		const departmentId = await findOneService(departmentModel, { key });
		const listJob = await findManyService(jobModel, { departmentId });
		let orders: any[] = [];
		await Promise.all(
			listJob.map(async (item: any) => {
				const order = await getListOrderService({ jobId: item._id, sender });
				orders = [...orders, ...order];
			}),
		);
		res.status(200).json({ data: orders, message: "Get all orders successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export { createOrder, getOrdersByEmployee, getOrdersByDepartment };
