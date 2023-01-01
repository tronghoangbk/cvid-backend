import { Request, Response } from "express";
import MajorModel from "../models/major.model";
import {
	createService,
	findOneService,
	findManyService,
	updateOneService,
	deleteOneService,
} from "../services/model.service";

const getAll = async (req: Request, res: Response) => {
	try {
		const majors = await findManyService(MajorModel, {});
		res.status(200).json({ data: majors, message: "Get all majors successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const createMany = async (req: Request, res: Response) => {
	try {
		const { data } = req.body;
		await Promise.all(
			data.map(async (item: any) => {
				await createService(MajorModel, item);
			}),
		);
		res.status(200).json({ message: "Create majors successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getListLevel = async (req: Request, res: Response) => {
	try {
		let majors = await findManyService(MajorModel, {});
		majors = majors.map((item: any) => item.level);
		res.status(200).json({ data: majors, message: "Get list levels successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getListMajorByLevel = async (req: Request, res: Response) => {
	try {
		const { level } = req.params;
		let majors = await findOneService(MajorModel, { level });
		majors = majors.majors;
		res.status(200).json({ data: majors, message: "Get list majors by level successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getAllListMajor = async (req: Request, res: Response) => {
	try {
		let majors = await findManyService(MajorModel, {});
		let listMajors = new Set();
		majors.forEach((item: any) => {
			item.majors.forEach((major: any) => {
				listMajors.add(major);
			});
		});
		res.status(200).json({ data: listMajors, message: "Get list majors successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export { getAll, createMany, getListLevel, getListMajorByLevel, getAllListMajor };
