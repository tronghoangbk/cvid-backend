import { Request, Response } from "express";
import TypeCompanyModal from "../models/businesstype.model";
import {
	createService,
	findOneService,
	findManyService,
	updateOneService,
	deleteOneService,
} from "../services/model.service";

const getAll = async (req: Request, res: Response) => {
	try {
		const typeCompanies = await findManyService(TypeCompanyModal, {});
		res.status(200).json({ typeCompanies: typeCompanies, message: "Get all type companies successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const createMany = async (req: Request, res: Response) => {
	try {
		const { data } = req.body;
		await Promise.all(
			data.map(async (item: any) => {
				await createService(TypeCompanyModal, item);
			}),
		);
		res.status(200).json({ message: "Create type companies successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export { getAll, createMany };
