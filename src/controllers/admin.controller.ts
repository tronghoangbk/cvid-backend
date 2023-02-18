import { Request, Response } from "express";
import EmployeeModal from "../models/employee.model";
import AdminModal from "../models/admin.model";
import CompanyModal from "../models/company.model";
import {
	createService,
	findOneService,
	findManyService,
	updateOneService,
	deleteOneService,
	countService,
} from "../services/model.service";
import { sendEmail } from "../services/mail.service";
import { errorResponse } from "../constant/errorResponse.constant";
import fs from "fs";
import { staticFolder } from "../constant/default.constant";
import {
	comparePassword,
	hashPassword,
	generateToken,
	verifyToken,
	removeUndefinedOfObj,
} from "../services/other.service";
import employeeModel from "../models/employee.model";
import companyModel from "../models/company.model";
import jobModel from "../models/job.model";

const confirmResume = async (req: Request, res: Response) => {
	try {
		const { id, times } = req.params;
		const { note } = req.body;
		const adminId = req.body.user.id;
		const admin = await findOneService(AdminModal, { _id: adminId });
		if (!admin) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		const employee = await findOneService(EmployeeModal, { _id: id });
		if (!employee) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		let data = {
			confirmed: 1,
			confirmAt: new Date(),
			confirmBy: adminId,
			note: note,
		};
		if (times === "1") {
			const updatedEmployee = await updateOneService(EmployeeModal, { _id: id }, { confirm1: data });
		} else if (times === "2") {
			const updatedEmployee = await updateOneService(
				EmployeeModal,
				{ _id: id, "confirm1.confirmed": 1 },
				{ confirm2: data },
			);
		}
		res.status(200).json({ message: "Confirm successfully" });
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

const cancelConfirmResume = async (req: Request, res: Response) => {
	try {
		const { id, times } = req.params;
		const { note } = req.body;
		const adminId = req.body.user.id;
		const admin = await findOneService(AdminModal, { _id: adminId });
		if (!admin) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		const employee = await findOneService(EmployeeModal, { _id: id });
		if (!employee) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		let data = {
			confirmed: 0,
			confirmAt: new Date(),
			confirmBy: adminId,
			note: note,
		};
		if (times === "1") {
			const updatedEmployee = await updateOneService(EmployeeModal, { _id: id }, { confirm1: data });
		} else if (times === "2") {
			const updatedEmployee = await updateOneService(EmployeeModal, { _id: id }, { confirm2: data });
		}
		res.status(200).json({ message: "Cancel confirm successfully" });
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

const notConfirmResume = async (req: Request, res: Response) => {
	try {
		const { id, times } = req.params;
		const { note } = req.body;
		const adminId = req.body.user.id;
		const admin = await findOneService(AdminModal, { _id: adminId });
		if (!admin) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		const employee = await findOneService(EmployeeModal, { _id: id });
		if (!employee) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		let data = {
			confirmed: -1,
			confirmAt: new Date(),
			confirmBy: adminId,
			note: note,
		};
		if (times === "1") {
			const updatedEmployee = await updateOneService(EmployeeModal, { _id: id }, { confirm1: data });
		} else if (times === "2") {
			const updatedEmployee = await updateOneService(EmployeeModal, { _id: id }, { confirm2: data });
		}
		res.status(200).json({ message: "Not confirm successfully" });
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

const getRole = async (req: Request, res: Response) => {
	try {
		const id = req.body.user.id;
		const admin = await findOneService(AdminModal, { _id: id });
		if (!admin) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		res.status(200).json({ roles: admin.roles, message: "Get role successfully" });
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const admin = await findOneService(AdminModal, { username });
		if (!admin) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		const isMatch = await comparePassword(password, admin.password);
		if (!isMatch) return res.status(400).json({ message: errorResponse["INVALID_PASSWORD"] });
		const token = generateToken({ id: admin._id, role: admin.role }, "1d");
		res.status(200).json({ user: admin, token, message: "Login successfully" });
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

const confirmCompany = async (req: Request, res: Response) => {
	try {
		const { id, times } = req.params;
		const { note } = req.body;
		const adminId = req.body.user.id;
		const admin = await findOneService(AdminModal, { _id: adminId });
		if (!admin) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		const company = await findOneService(CompanyModal, { _id: id });
		if (!company) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		let data = {
			confirmed: 1,
			confirmAt: new Date(),
			confirmBy: adminId,
			note: note,
		};
		if (times === "1") {
			const updatedCompany = await updateOneService(CompanyModal, { _id: id }, { confirm1: data });
		} else if (times === "2") {
			const updatedCompany = await updateOneService(
				CompanyModal,
				{ _id: id, "confirm1.confirmed": 1 },
				{ confirm2: data },
			);
		}
		res.status(200).json({ message: "Confirm successfully" });
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

const cancelConfirmCompany = async (req: Request, res: Response) => {
	try {
		const { id, times } = req.params;
		const { note } = req.body;
		const adminId = req.body.user.id;
		const admin = await findOneService(AdminModal, { _id: adminId });
		if (!admin) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		const company = await findOneService(CompanyModal, { _id: id });
		if (!company) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		let data = {
			confirmed: 0,
			confirmAt: new Date(),
			confirmBy: adminId,
			note: note,
		};
		if (times === "1") {
			const updatedCompany = await updateOneService(CompanyModal, { _id: id }, { confirm1: data });
		} else if (times === "2") {
			const updatedCompany = await updateOneService(CompanyModal, { _id: id }, { confirm2: data });
		}
		res.status(200).json({ message: "Cancel confirm successfully" });
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

const notConfirmCompany = async (req: Request, res: Response) => {
	try {
		const { id, times } = req.params;
		const { note } = req.body;
		const adminId = req.body.user.id;
		const admin = await findOneService(AdminModal, { _id: adminId });
		if (!admin) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		const company = await findOneService(CompanyModal, { _id: id });
		if (!company) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		let data = {
			confirmed: -1,
			confirmAt: new Date(),
			confirmBy: adminId,
			note: note,
		};
		if (times === "1") {
			const updatedCompany = await updateOneService(CompanyModal, { _id: id }, { confirm1: data });
		} else if (times === "2") {
			const updatedCompany = await updateOneService(CompanyModal, { _id: id }, { confirm2: data });
		}
		res.status(200).json({ message: "Not confirm successfully" });
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

const confirmJob = async (req: Request, res: Response) => {
	try {
		const { id, times } = req.params;
		const { note } = req.body;
		const adminId = req.body.user.id;
		const admin = await findOneService(AdminModal, { _id: adminId });
		if (!admin) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		const job = await findOneService(jobModel, { _id: id });
		if (!job) return res.status(404).json({ message: errorResponse["NOT_FOUND"] });
		let data = {
			confirmed: 1,
			confirmAt: new Date(),
			confirmBy: adminId,
			note: note,
		};
		if (times === "1") {
			let updatedJob = await updateOneService(jobModel, { _id: id }, { confirm1: data });
		} else if (times === "2") {
			let updatedJob = await updateOneService(jobModel, { _id: id, "confirm1.confirmed": 1 }, { confirm2: data });
		}
		res.status(200).json({ message: "Confirm successfully" });
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

// const cancelConfirmJob = async (req: Request, res: Response) => {
// 	try {
// 		const { id, times } = req.params;
// 		const { note } = req.body;
// 		const adminId = req.body.user.id;
// 		const admin = await findOneService(AdminModal, { _id: adminId });
// 		if (!admin) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
// 		let data = {
// 			confirmed: 0,
// 			confirmAt: new Date(),
// 			confirmBy: adminId,
// 			note: note,
// 		};
// 		if (times === "1") {
// 			const updatedJob = await updateOneService(JobModal, { _id: id }, { confirm1: data });
// 		} else if (times === "2") {
// 			const updatedJob = await updateOneService(JobModal, { _id: id }, { confirm2: data });
// 		}
// 		res.status(200).json({ message: "Cancel confirm successfully" });
// 	} catch (error: any) {
// 		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
// 	}
// };

// const notConfirmJob = async (req: Request, res: Response) => {
// 	try {
// 		const { id, times } = req.params;
// 		const { note } = req.body;
// 		const adminId = req.body.user.id;
// 		const admin = await findOneService(AdminModal, { _id: adminId });
// 		if (!admin) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
// 		let data = {
// 			confirmed: -1,
// 			confirmAt: new Date(),
// 			confirmBy: adminId,
// 			note: note,
// 		};
// 		if (times === "1") {
// 			const updatedJob = await updateOneService(JobModal, { _id: id }, { confirm1: data });
// 		} else if (times === "2") {
// 			const updatedJob = await updateOneService(JobModal, { _id: id }, { confirm2: data });
// 		}
// 		res.status(200).json({ message: "Not confirm successfully" });
// 	} catch (error: any) {
// 		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
// 	}
// };

export {
	confirmResume,
	cancelConfirmResume,
	getRole,
	login,
	notConfirmResume,
	confirmCompany,
	cancelConfirmCompany,
	notConfirmCompany,
	confirmJob,
};
