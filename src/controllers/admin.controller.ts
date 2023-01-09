import { Request, Response } from "express";
import EmployeeModal from "../models/employee.model";
import AdminModal from "../models/admin.model";
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

export const confirmResume = async (req: Request, res: Response) => {
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
            confirmDate: new Date(),
			confirmBy: id,
            note: note,
        }
        if (times === "1") {
            const updatedEmployee = await updateOneService(EmployeeModal, { _id: id }, { confirm1: data });
        } else if (times === "2") {
            const updatedEmployee = await updateOneService(EmployeeModal, { _id: id, "confirm1.confirmed": 1 }, { confirm2: data });
        }
        res.status(200).json({ message: "Confirm successfully" });
    } catch (error: any) {
        res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
    }
};

export const cancelConfirmResume = async (req: Request, res: Response) => {
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
            confirmDate: new Date(),
            confirmBy: id,
            note: note,
        }
        if (times === "1") {
            const updatedEmployee = await updateOneService(EmployeeModal, { _id: id }, { confirm1: data });
        } else if (times === "2") {
            const updatedEmployee = await updateOneService(EmployeeModal, { _id: id, "confirm1.confirmed": 1 }, { confirm2: data });
        }
        res.status(200).json({ message: "Cancel confirm successfully" });
    } catch (error: any) {
        res.status(500).json({ message: errorResponse["SERVER_ERROR"] });
    }
};


