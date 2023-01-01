import { Request, Response } from "express";
import UserModal from "../models/employee.model";
import path from "path";
import {
	createService,
	findOneService,
	findManyService,
	updateOneService,
	deleteOneService,
} from "../services/model.service";
import { comparePassword, hashPassword, generateToken } from "../services/other.service";

const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await findOneService(UserModal, { username: username });
		if (!user) return res.status(404).json({ message: "User not found" });
		const isPasswordCorrect = comparePassword(password, user.password);
		if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid credentials" });
		const token = generateToken({ id: user._id, username: user.username }, "1d");
		res.status(200).json({ userInfo: user, message: "Login successfully", token: token });
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

const register = async (req: Request, res: Response) => {
	try {
		const newUser = req.body;
		newUser.password = hashPassword(newUser.password);
		const user = await createService(UserModal, newUser);
		res.status(200).json({ userInfo: user, message: "Register successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const createCV = async (req: Request, res: Response) => {
	try {
		const id = req.body._id;
		await updateOneService(UserModal, { _id: id }, req.body);
		res.status(200).json({ message: "Create CV successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getAllEmployee = async (req: Request, res: Response) => {
	try {
		const employees = await findManyService(UserModal, {});
		res.status(200).json({ employees: employees, message: "Get all employees successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getEmployeeById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const employee = await findOneService(UserModal, { _id: id });
		res.status(200).json({ employee: employee, message: "Get employee successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const updateEmployee = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		await updateOneService(UserModal, { _id: id }, req.body);
		res.status(200).json({ message: "Update employee successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const deleteEmployee = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		await deleteOneService(UserModal, { _id: id });
		res.status(200).json({ message: "Delete employee successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const verifyEmail = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		await updateOneService(UserModal, { _id: id }, { confirmEmail: true });
		let message = "Confirm email successfully";
		res.redirect(`/user/verified/error=false&message=${message}`);
	} catch (error: any) {
        let message = "Confirm email failed";
		res.redirect(`/user/verified/error=true&message=${message}`);
	}
};

const verified = async (req: Request, res: Response) => {
	try {
		res.sendFile(path.join(__dirname, "./../views/verified.html"));
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

export { login, register, createCV, getAllEmployee, getEmployeeById, updateEmployee, deleteEmployee, verifyEmail, verified };
