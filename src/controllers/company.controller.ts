import { Request, Response } from "express";
import DomParser from "dom-parser";
import CompanyModal from "../models/company.model";
import { v4 as uuidv4 } from "uuid";

import path from "path";
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
	removeUndefinedOfObj,
	getDataFromURL,
} from "../services/other.service";
import adminModel from "../models/admin.model";
export const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await findOneService(CompanyModal, { username: username });
		if (!user) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		const isPasswordCorrect = comparePassword(password, user.password);
		if (!isPasswordCorrect) return res.status(401).json({ message: errorResponse["INVALID_PASSWORD"] });
		if (!user.confirmEmail) return res.status(403).json({ message: errorResponse["USER_NOT_CONFIRMED"] });
		const idToken = generateToken({ id: user._id, username: user.username, role: "company" }, "1d");
		res.status(200).json({ ...user._doc, idToken, expiresIn: "3600" });
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

export const register = async (req: Request, res: Response) => {
	try {
		const newUser = req.body;
		let userInfo = await findOneService(CompanyModal, { username: newUser.username });
		if (userInfo) return res.status(400).json({ message: errorResponse["TAXCODE_EXISTS"] });
		userInfo = await findOneService(CompanyModal, { email: newUser.email });
		if (userInfo) return res.status(400).json({ message: errorResponse["EMAIL_EXISTS"] });
		userInfo = await findOneService(CompanyModal, { phone: newUser.phone });
		if (userInfo) return res.status(400).json({ message: errorResponse["PHONE_EXISTS"] });
		newUser.password = hashPassword(newUser.password);
		const user = await createService(CompanyModal, newUser);
		// Send email
		const subject = "Đăng ký thành công";
		let html = fs.readFileSync(`${staticFolder}views/mailConfirm.html`, { encoding: "utf8" });
		let link = `${req.headers.host}/company/verify-email/${user._id}`;
		html = html.replace("{{link}}", link);
		await sendEmail(user.email, subject, html);
		res.status(200).json({ message: "Register successfully" });
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

export const getMyCompanyInfo = async (req: Request, res: Response) => {
	try {
		let userId = req.body.user.id;
		const user = await findOneService(CompanyModal, { _id: userId });
		if (!user) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		delete user.password;
		res.status(200).json(user);
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

export const verifyEmail = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await updateOneService(CompanyModal, { _id: id }, { confirmEmail: true });
		let message = "Xác thực email thành công";
		res.redirect(`/company/verified?message=${message}`);
	} catch (error: any) {
		let message = "Xác thực email thất bại";
		res.redirect(`/company/verified?error=true&message=${message}`);
	}
};

export const verified = async (req: Request, res: Response) => {
	try {
		res.sendFile(`${staticFolder}views/verified.html`);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

export const getAllCompany = async (req: Request, res: Response) => {
	try {
		const users = await CompanyModal.find({})
			.lean()
			.populate({ path: "adminConfirm1", select: "name" })
			.populate({ path: "adminConfirm2", select: "name" });
		res.status(200).json(users);
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

export const getCompanyById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await findOneService(CompanyModal, { _id: id });
		if (!user) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		res.status(200).json(user);
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

export const updateCompany = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await findOneService(CompanyModal, { _id: id });
		if (!user) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		const updatedUser = req.body;
		if (updatedUser.password) updatedUser.password = hashPassword(updatedUser.password);
		const newUser = await updateOneService(CompanyModal, { _id: id }, updatedUser);
		res.status(200).json(newUser);
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

export const getInfoCompanyFromUri = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		let url = `https://masothue.com/Search/?q=${id}&type=auto`;
		let htmlStr = await getDataFromURL(url);
		console.log(url);
		const parser = new DomParser();
		const document = parser.parseFromString(htmlStr);
		let result: any = document.getElementsByClassName("table-taxinfo");
		let CompanyInfo: any = {};
		console.log(result);
		let thead = result[0].getElementsByTagName("thead");
		console.log(thead);
		CompanyInfo.companyName = thead[0].getElementsByTagName("th")[0].textContent;
		let tbody = result[0].getElementsByTagName("tbody");
		result = tbody[0].getElementsByTagName("tr");
		// CompanyInfo.name = tbody[0].getElementsByTagName("th")[0].textContent;
		result.forEach((item: any) => {
			item = item.getElementsByTagName("td");
			if (item[0].textContent.trim() === "Tên quốc tế") CompanyInfo.engName = item[1].textContent;
			if (item[0].textContent.trim() === "Tên viết tắt") CompanyInfo.sortName = item[1].textContent;
			if (item[0].textContent.trim() === "Mã số thuế") CompanyInfo.taxCode = item[1].textContent;
			if (item[0].textContent.trim() === "Địa chỉ") CompanyInfo.address = item[1].textContent;
			if (item[0].textContent.trim() === "Điện thoại") CompanyInfo.companyPhone = item[1].textContent;
			if (item[0].textContent.trim() === "Ngày hoạt động") CompanyInfo.openDate = item[1].textContent;
			if (item[0].textContent.trim() === "Người đại diện") CompanyInfo.representative = item[1].textContent;
			if (item[0].textContent.trim() === "Quản lý bởi") CompanyInfo.managedBy = item[1].textContent;
			if (item[0].textContent.trim() === "Tình trạng") CompanyInfo.status = item[1].textContent;
			if (item[0].textContent.trim() === "Loại hình DN") CompanyInfo.typeOfBusiness = item[1].textContent;
		});
		res.status(200).json(CompanyInfo);
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};


// Lấy số lượng công ty đã tạo

export const getCompanyCount = async (req: Request, res: Response) => {
	try {
		const count = await countService(CompanyModal, {});
		res.status(200).json(count);
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

export const getDepartmentByKey = async (req: Request, res: Response) => {
	try {
		const { key } = req.params;
		const company = await findOneService(CompanyModal, { "departments.key": key });
		if (!company) return res.status(404).json({ message: errorResponse["NOT_FOUND"] });
		const department = company.departments.find((item: any) => item.key === key);
		res.status(200).json(department);
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

export const createJobForDepartment = async (req: Request, res: Response) => {
	try {
		const { key } = req.params;
		const company = await findOneService(CompanyModal, { "departments.key": key });
		if (!company) return res.status(404).json({ message: errorResponse["NOT_FOUND"] });
		const department = company.departments.find((item: any) => item.key === key);
		const {
			title,
			position,
			level,
			major,
			industry,
			location,
			workingEnvironment,
			experience,
			quantity,
			minSalary,
			maxSalary,
			description,
		} = req.body;
		let newJob = {
			title,
			position,
			level,
			major,
			industry,
			location,
			workingEnvironment,
			experience,
			quantity,
			minSalary,
			maxSalary,
			description,
		};
		const newUser = await updateOneService(
			CompanyModal,
			{ "departments.key": key },
			{ $push: { "departments.$.jobs": newJob } },
		);
		res.status(200).json(newJob);
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

export const deleteJobForDepartment = async (req: Request, res: Response) => {
	try {
		const { key, jobId } = req.params;
		const company = await findOneService(CompanyModal, { "departments.key": key });
		if (!company) return res.status(404).json({ message: errorResponse["NOT_FOUND"] });
		const department = company.departments.find((item: any) => item.key === key);
		const job = department.jobs.find((item: any) => item.key === key);
		await updateOneService(
			CompanyModal,
			{ "departments.key": key },
			{ $pull: { "departments.$.jobs": { _id: jobId } } },
		);
		res.status(200).json(job);
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

