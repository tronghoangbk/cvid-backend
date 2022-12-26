import { Request, Response } from "express";
import QuestionModel from "../models/question.model";
import {
	createService,
	findOneService,
	findManyService,
	updateOneService,
	deleteOneService,
} from "../services/model.service";

const getAll = async (req: Request, res: Response) => {
	try {
		const questions = await findManyService(QuestionModel, {});
		res.status(200).json({ questions: questions, message: "Get all questions successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const createMany = async (req: Request, res: Response) => {
	try {
		const { data } = req.body;
		await Promise.all(
			data.map(async (item: any) => {
				await createService(QuestionModel, item);
			}),
		);
		res.status(200).json({ message: "Create questions successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export { getAll, createMany };
