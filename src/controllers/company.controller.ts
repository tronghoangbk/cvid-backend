import { Request, Response } from "express";
import DomParser from "dom-parser";
import CompanyModal from "../models/company.model";
import path from "path";
import {
	createService,
	findOneService,
	findManyService,
	updateOneService,
	deleteOneService,
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

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await findOneService(CompanyModal, { username: username });
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

export const register = async (req: Request, res: Response) => {
	try {
		const newUser = req.body;
		let userInfo = await findOneService(CompanyModal, { username: newUser.username });
		if (userInfo) return res.status(400).json({ message: errorResponse["PHONE_EXISTS"] });
		userInfo = await findOneService(CompanyModal, { email: newUser.email });
		if (userInfo) return res.status(400).json({ message: errorResponse["EMAIL_EXISTS"] });
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
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

export const verifyEmail = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		// const user = await findOneService(CompanyModal, { _id: id });
		// if (!user) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		// if (user.confirmEmail) return res.status(400).json({ message: errorResponse["USER_CONFIRMED"] });
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
		const users = await findManyService(CompanyModal, {});
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
		const parser = new DomParser();
		const document = parser.parseFromString(htmlStr);
		let result: any = document.getElementsByClassName("copy");
		if (!result.length) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		let CompanyInfo =
			result.length === 8
				? {
						name: result[0]?.textContent,
						engName: result[1]?.textContent,
						sortName: result[2]?.textContent,
						taxCode: result[3]?.textContent,
						address: result[4]?.textContent,
						phone: result[5]?.textContent,
						opening: result[6]?.textContent,
						original: result[7]?.textContent,
				  }
				: {
						name: result[0]?.textContent,
						taxCode: result[1]?.textContent,
						address: result[2]?.textContent,
						phone: result[3]?.textContent,
						opening: result[4]?.textContent,
                        original: result[5]?.textContent,
				  };

		res.status(200).json(CompanyInfo);
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};
