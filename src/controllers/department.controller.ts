import { Request, Response } from "express";
import { IDepartment } from "../interfaces/department.interface";
import departmentModel from "../models/department.model";
import { createService, findManyService } from "../services/model.service";
import { v4 } from "uuid";
import { getOneDepartment } from "../services/department.service";

const createDepartment = async (req: Request, res: Response) => {
	try {
		const data: IDepartment = req.body;
		data.key = v4();
		console.log(data);
		const department = await createService(departmentModel, data);
		res.status(200).json({ data: department, message: "Create department successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getDepartmentForCompany = async (req: Request, res: Response) => {
	try {
		const { companyId } = req.params;
		if (!companyId) return res.status(400).json({ message: "Company id is required" });
		const departments = await findManyService(departmentModel, { companyId });
		res.status(200).json({ data: departments, message: "Get all departments successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getDepartmentByKey = async (req: Request, res: Response) => {
	try {
		const { key } = req.params;
		const department = await getOneDepartment({ key });
		res.status(200).json({ data: department, message: "Get department successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};


export { createDepartment, getDepartmentForCompany, getDepartmentByKey };
