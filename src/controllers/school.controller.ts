import { Request, Response } from "express";
import SchoolModal from "../models/school.model";
import { createService, findOneService, findManyService, updateOneService, deleteOneService } from "../services/model.service";

const getAll = async (req: Request, res: Response) => {
    try {
        const schools = await findManyService(SchoolModal, {});
        res.status(200).json({ schools: schools, message: "Get all schools successfully" });
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
                await createService(SchoolModal, item);
            }),
        );
        res.status(200).json({ message: "Create schools successfully" });
    }
    catch (error: any) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export { getAll, createMany };