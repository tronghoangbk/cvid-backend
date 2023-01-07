import { Request, Response } from "express";
import EnvironmentModel from "../models/environment.model";
import { createService, findOneService, findManyService, updateOneService, deleteOneService } from "../services/model.service";

const getAll = async (req: Request, res: Response) => {
    try {
        const environments = await findManyService(EnvironmentModel, {});
        res.status(200).json({ data: environments, message: "Get all environments successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const createMany = async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        await Promise.all(
            data.map(async (item: any) => { 
                await createService(EnvironmentModel, item);
            }),
        );
        res.status(200).json({ message: "Create environments successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export { getAll, createMany };

