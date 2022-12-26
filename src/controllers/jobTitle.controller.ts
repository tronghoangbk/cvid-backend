import { Request, Response } from "express";
import JobTitleModel from "../models/jobtitle.model";
import { createService, findOneService, findManyService, updateOneService, deleteOneService } from "../services/model.service";

const getAll = async (req: Request, res: Response) => {
    try {
        const jobTitles = await findManyService(JobTitleModel, {});
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
                await createService(JobTitleModel, item);
            }),
        );
        res.status(200).json({ message: "Create job titles successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export { getAll, createMany };

