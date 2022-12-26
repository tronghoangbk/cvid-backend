import { Request, Response } from "express";
import MajorModel from "../models/question.model";
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
        res.status(200).json({ majors: majors, message: "Get all majors successfully" });
    }
    catch (error: any) {
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
    }
    catch (error: any) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export { getAll, createMany };