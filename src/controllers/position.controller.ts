import { Request, Response } from "express";
import PositionModel from "../models/position.model";
import { createService, findOneService, findManyService, updateOneService, deleteOneService } from "../services/model.service";

const getAll = async (req: Request, res: Response) => {
    try {
        const positions = await findManyService(PositionModel, {});
        res.status(200).json({ positions: positions, message: "Get all positions successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const createMany = async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        await Promise.all(
            data.map(async (item: any) => {
                await createService(PositionModel, item);
            }),
        );
        res.status(200).json({ message: "Create positions successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export { getAll, createMany };