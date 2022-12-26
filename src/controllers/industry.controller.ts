import { Request, Response } from "express";
import IndustryModel from "../models/industry.model";
import { createService, findOneService, findManyService, updateOneService, deleteOneService } from "../services/model.service";

const getAll = async (req: Request, res: Response) => {
    try {
        const jobTitles = await findManyService(IndustryModel, {});
        res.status(200).json({ jobTitles: jobTitles, message: "Get all job titles successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const createMany = async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        await Promise.all(
            data.map(async (item: any) => {
                await createService(IndustryModel, item);
            }),
        );
        res.status(200).json({ message: "Create job titles successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export { getAll, createMany };