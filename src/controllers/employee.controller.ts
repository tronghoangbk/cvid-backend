import { Request, Response } from "express";
import EmployeeModal from "../models/employee.model";
import {
	createService,
	findOneService,
	findManyService,
	updateOneService,
	deleteOneService,
	countService
} from "../services/model.service";
import { sendEmail } from "../services/mail.service";
import { errorResponse } from "../constant/errorResponse.constant";
import fs from "fs";
import { staticFolder } from "../constant/default.constant";
import { comparePassword, hashPassword, generateToken, removeUndefinedOfObj } from "../services/other.service";
import employeeModel from "../models/employee.model";

const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await findOneService(EmployeeModal, { username: username });
		if (!user) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		const isPasswordCorrect = comparePassword(password, user.password);
		if (!isPasswordCorrect) return res.status(401).json({ message: errorResponse["INVALID_PASSWORD"] });
		if (!user.confirmEmail) return res.status(403).json({ message: errorResponse["USER_NOT_CONFIRMED"] });
		const idToken = generateToken({ id: user._id, username: user.username }, "1d");
		res.status(200).json({ ...user._doc, idToken, expiresIn: "3600" });
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

const register = async (req: Request, res: Response) => {
	try {
		const newUser = req.body;
		let userInfo = await findOneService(EmployeeModal, { username: newUser.username });
		if (userInfo) return res.status(400).json({ message: errorResponse["PHONE_EXISTS"] });
		userInfo = await findOneService(EmployeeModal, { email: newUser.email });
		if (userInfo) return res.status(400).json({ message: errorResponse["EMAIL_EXISTS"] });
		newUser.password = hashPassword(newUser.password);
		const user = await createService(EmployeeModal, newUser);
		// Send email
		const subject = "Đăng ký thành công";
		let html = fs.readFileSync(`${staticFolder}views/mailConfirm.html`, { encoding: "utf8" });
		let link = `${req.headers.host}/employee/verify-email/${user._id}`;
		html = html.replace("{{link}}", link);
		await sendEmail(user.email, subject, html);
		res.status(200).json({ message: "Register successfully" });
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

const getMyReSume = async (req: Request, res: Response) => {
	try {
		let userId = req.body.user.id
		let userInfo = await findOneService(employeeModel, {_id: userId})
		delete userInfo.password
		res.status(200).json({...userInfo})
	} catch (error) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

const createCV = async (req: Request, res: Response) => {
	try {
		const id = req.params._id;
		removeUndefinedOfObj(req.body);
		await updateOneService(EmployeeModal, { _id: id }, req.body);
		res.status(200).json({ message: "Create CV successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getAllEmployee = async (req: Request, res: Response) => {
	try {
		const employees = await findManyService(EmployeeModal, {});
		res.status(200).json({ employees: employees, message: "Get all employees successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getEmployeeById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const employee = await findOneService(EmployeeModal, { _id: id });
		res.status(200).json({ employee: employee, message: "Get employee successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const updateEmployee = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		await updateOneService(EmployeeModal, { _id: id }, req.body);
		res.status(200).json({ message: "Update employee successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const deleteEmployee = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		await deleteOneService(EmployeeModal, { _id: id });
		res.status(200).json({ message: "Delete employee successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const verifyEmail = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		await updateOneService(EmployeeModal, { _id: id }, { confirmEmail: true });
		let message = "Xác nhận email thành công";
		res.redirect(`/employee/verified?message=${message}`);
	} catch (error: any) {
		let message = "Xác nhận email thất bại";
		res.redirect(`/employee/verified?error=true&message=${message}`);
	}
};

const verified = async (req: Request, res: Response) => {
	try {
		res.sendFile(`${staticFolder}views/verified.html`);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getEmployeeCount = async (req: Request, res: Response) => {
	try {
		const count = await countService(EmployeeModal, {});
		res.status(200).json(count);
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export {
	login,
	register,
	createCV,
	getAllEmployee,
	getEmployeeById,
	updateEmployee,
	deleteEmployee,
	verifyEmail,
	verified,
	getMyReSume,
	getEmployeeCount,
};
