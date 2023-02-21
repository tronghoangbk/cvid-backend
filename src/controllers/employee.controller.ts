import { Request, Response } from "express";
import EmployeeModal from "../models/employee.model";
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
import CompanyModal from "../models/company.model";
import { getListJobService } from "../services/job.service";
import { checkOrderExistService, getListOrderService } from "../services/order.service";

const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await findOneService(EmployeeModal, { username: username });
		if (!user) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
		const isPasswordCorrect = comparePassword(password, user.password);
		if (!isPasswordCorrect) return res.status(401).json({ message: errorResponse["INVALID_PASSWORD"] });
		if (!user.confirmEmail) return res.status(403).json({ message: errorResponse["USER_NOT_CONFIRMED"] });
		const idToken = generateToken({ id: user._id, username: user.username, role: "employee" }, "1d");
		delete user._doc.password;
		res.status(200).json({ ...user._doc, idToken, expiresIn: "3600" });
	} catch (error: any) {
		res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
	}
};

const register = async (req: Request, res: Response) => {
	try {
		const newUser = req.body;
		newUser.jobCriteria = {
			// jobTitle: newUser.jobTitle,
			province: newUser.province,
			major: newUser.major,
		};
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
		let userId = req.body.user.id;
		let userInfo = await findOneService(employeeModel, { _id: userId });
		delete userInfo.password;
		res.status(200).json({ ...userInfo });
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
		const employees: any = await EmployeeModal.find({})
			.lean()
			.populate({
				path: "adminConfirm1",
				select: "name",
			})
			.populate({
				path: "adminConfirm2",
				select: "name",
			});

		res.status(200).json({ data: employees, message: "Get all employees successfully" });
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getEmployeeById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const employee = await findOneService(EmployeeModal, { _id: id });
		res.status(200).json(employee);
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

const addSchool = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { school, level, major, start, end, jobTitle } = req.body;
		const newSchool = {
			school,
			level,
			major,
			start,
			end,
			jobTitle,
		};
		await updateOneService(EmployeeModal, { _id: id }, { $push: { skillEducation: newSchool } });
		res.status(200).json({ message: "Add school successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const deleteSchool = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const schoolId = req.params.schoolId;
		await updateOneService(EmployeeModal, { _id: id }, { $pull: { skillEducation: { _id: schoolId } } });
		res.status(200).json({ message: "Delete school successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const addShortTraining = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { start, end, certificate, organizer } = req.body;
		const newShortTraining = {
			certificate,
			start,
			end,
			organizer,
		};
		await updateOneService(EmployeeModal, { _id: id }, { $push: { shortTraining: newShortTraining } });
		res.status(200).json({ message: "Add short training successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const deleteShortTraining = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const shortTrainingId = req.params.shortTrainingId;
		await updateOneService(EmployeeModal, { _id: id }, { $pull: { shortTraining: { _id: shortTrainingId } } });
		res.status(200).json({ message: "Delete short training successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const addWorkExperience = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		let { start, end, company, address, leaving, process, isWorking, isCurrent } = req.body;
		if (process.length > 0) {
			start = process[0].from;
			end = process[process.length - 1].to;
		}
		const newWorkExperience = {
			start,
			end,
			company,
			address,
			leaving,
			process,
			isCurrent,
			isWorking,
		};
		await updateOneService(EmployeeModal, { _id: id }, { $push: { workExperience: newWorkExperience } });
		res.status(200).json({ message: "Add work experience successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const deleteWorkExperience = async (req: Request, res: Response) => {
	try {
		const { id, workId } = req.params;
		await updateOneService(EmployeeModal, { _id: id }, { $pull: { workExperience: { _id: workId } } });
		res.status(200).json({ message: "Delete work experience successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const sendOTP = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { phone } = req.body;
		let user = await findOneService(EmployeeModal, { _id: id });
		if (!user) {
			return res.status(400).json({ message: errorResponse["USER_NOT_FOUND"] });
		}
		let checkExist = await findOneService(EmployeeModal, { username: phone, _id: { $ne: id } });
		if (checkExist) {
			return res.status(400).json({ message: errorResponse["PHONE_EXISTS"] });
		}
		const otp = Math.floor(100000 + Math.random() * 900000);
		let message = `Mã OTP của bạn là ${otp}`;
		console.log(message);
		const token = generateToken({ otp, phone }, "10m");
		await updateOneService(EmployeeModal, { _id: id }, { otp: token, username: phone });
		res.status(200).json({ message: "Send OTP successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const confirmPhone = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { otp } = req.body;
		let user = await findOneService(EmployeeModal, { _id: id });
		if (!user) {
			return res.status(400).json({ message: errorResponse["USER_NOT_FOUND"] });
		}
		if (!user.otp) {
			return res.status(400).json({ message: errorResponse["NOT_FOUND"] });
		}
		const decoded = verifyToken(user.otp);
		await updateOneService(EmployeeModal, { _id: id }, { otp: null, confirmPhone: true, username: decoded.phone });
		res.status(200).json({ message: "Confirm phone successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const findJob = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		let jobCriteria = req.body;
		jobCriteria = removeUndefinedOfObj(jobCriteria);
		console.log(jobCriteria);
		let employeeInfo = await updateOneService(EmployeeModal, { _id: id }, { jobCriteria });
		if (jobCriteria.status === false) {
			return res.status(200).json({ message: "Stop find job successfully", data: [] });
		}
		let query = {
			title: jobCriteria.jobTitle,
			position: jobCriteria.position?.length > 0 ? { $all: jobCriteria.position } : undefined,
			workingEnvironment: jobCriteria.environment?.length > 0 ? { $all: jobCriteria.environment } : undefined,
			industry: jobCriteria.industry?.length > 0 ? { $all: jobCriteria.industry } : undefined,
			location: jobCriteria.province ? jobCriteria.province : undefined,
			major: { $in: jobCriteria.major },
			status: true,
		};
		let listJob = await getListJobService(query);
		let listOrder = await getListOrderService({ employeeId: id });
		listJob = listJob.filter(job => {
			let check = true;
			for (let order of listOrder) {
				if (order.jobId!.toString() === job._id.toString()) {
					check = false;
					break;
				}
			}
			return check;
		});
		res.status(200).json({ message: "Find job successfully", data: listJob });
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getCountResume = async (req: Request, res: Response) => {
	try {
		let count = await countService(EmployeeModal, {});
		res.status(200).json(count);
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const updatePoint = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { pointList } = req.body;
		let employee = await findOneService(EmployeeModal, { _id: id });
		if (!employee) {
			return res.status(400).json({ message: errorResponse["USER_NOT_FOUND"] });
		}
		let point = 0;
		pointList.forEach((item: any, index: number) => {
			item = parseInt(item);
			if (!isNaN(item) && item >= 0 && item <= 10) {
				point += item;
			} else {
				pointList[index] = 0;
			}
		});
		point = point / pointList.length;
		point = Math.round(point);
		console.log(point);
		console.log(pointList);
		await updateOneService(EmployeeModal, { _id: id }, { points: point, pointList: pointList });
		res.status(200).json({ message: "Update point successfully" });
	} catch (error: any) {
		console.log(error);
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
	addSchool,
	deleteSchool,
	sendOTP,
	confirmPhone,
	addShortTraining,
	deleteShortTraining,
	addWorkExperience,
	deleteWorkExperience,
	findJob,
	getCountResume,
	updatePoint,
};
