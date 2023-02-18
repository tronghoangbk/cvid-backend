import { Request, Response } from "express";
import { getListJobService } from "../services/job.service";
import jobModel from "../models/job.model";
import { createService, findManyService } from "../services/model.service";
import { IJob } from "../interfaces/job.interface";

const getAllJob = async (req: Request, res: Response) => {
	try {
		const jobs = await getListJobService( {});
		res.status(200).json({ data: jobs, message: "Get all jobs successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getJobForDepartment = async (req: Request, res: Response) => {
    try {
        const { departmentId } = req.params;
        const jobs = await getListJobService({ departmentId });
        res.status(200).json({ data: jobs, message: "Get all jobs successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const createJob = async (req: Request, res: Response) => {
    try {
        const data: IJob = req.body;
        console.log(data);
        const job = await createService(jobModel, data);
        res.status(200).json({ data: job, message: "Create job successfully" });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};






export { getAllJob, getJobForDepartment, createJob };