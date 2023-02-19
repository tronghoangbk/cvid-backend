import { Request, Response } from "express";
import { getListJobService, getListJobFullInfoService, getOneJobService } from "../services/job.service";
import jobModel from "../models/job.model";
import { createService, findManyService } from "../services/model.service";
import { IJob } from "../interfaces/job.interface";
import { getListEmployee } from "../services/employee.service";
import { check } from "prettier";
import { checkOrderExistService } from "../services/order.service";

const getAllJob = async (req: Request, res: Response) => {
	try {
		const jobs = await getListJobFullInfoService({});
		res.status(200).json({ data: jobs, message: "Get all jobs successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getJobForDepartment = async (req: Request, res: Response) => {
	try {
		const { departmentId, key } = req.params;
		const jobs = await getListJobService({ departmentId, key });
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

const getEmployeeForJob = async (req: Request, res: Response) => {
	try {
		const { jobId } = req.params;
		const { school } = req.body;
		const jobs = await getOneJobService({ _id: jobId, "confirm2.confirmed": 1 });
		if (!jobs) return res.status(404).json({ message: "Job not found" });
		
		let query = {
			"jobCriteria.jobTitle": jobs.title,
			"confirm1.confirmed": 1,
			"confirm2.confirmed": 1,
			status: true,
			major: { $in: jobs.major },
			school,
		};
		let listEmployee = await getListEmployee(query);
		let list = await Promise.all(
			listEmployee.filter(async item => {
				return !(await checkOrderExistService({ employeeId: item._id, jobId }));
			}),
		);

		res.status(200).json({ data: list, message: "Get all employees successfully" });
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

const gẹtJobDetail = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const job = await getOneJobService({ _id: id });
		if (!job) return res.status(404).json({ message: "Job not found" });
		res.status(200).json({ data: job, message: "Get job detail successfully" });
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

export { getAllJob, getJobForDepartment, createJob, getEmployeeForJob, gẹtJobDetail };
