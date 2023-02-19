import { IJob } from "../interfaces/job.interface";
import jobModel from "../models/job.model";
import { removeUndefinedOfObj } from "./other.service";
const getOneJobService = async (query: object) => {
	query = removeUndefinedOfObj(query);
	let job = jobModel
		.findOne(query)
		.populate({ path: "companyInfo", select: "companyType" })
		.populate({ path: "departmentInfo", select: "departmentName" })
		.populate({ path: "adminConfirm1", select: "name" })
		.populate({ path: "adminConfirm2", select: "name" })
		.lean();
	return job;
};

const getListJobService = async (query: object) => {
	query = removeUndefinedOfObj(query);
	let jobs = jobModel
		.find(query)
		.populate({ path: "companyInfo", select: "companyType" })
		.populate({ path: "departmentInfo", select: "departmentName" })
		.populate({ path: "adminConfirm1", select: "name" })
		.populate({ path: "adminConfirm2", select: "name" })
		.lean();
	return jobs;
};

const getOneJobFullInfoService = async (query: object) => {
	query = removeUndefinedOfObj(query);
	let job = jobModel
		.find(query)
		.populate({ path: "companyInfo" })
		.populate({ path: "departmentInfo" })
		.populate({ path: "adminConfirm1", select: "name" })
		.populate({ path: "adminConfirm2" , select: "name"})
		.lean();
	return job;
};

const getListJobFullInfoService = async (query: object) => {
	query = removeUndefinedOfObj(query);
	let jobs = jobModel
		.find(query)
		.populate({ path: "companyInfo" })
		.populate({ path: "departmentInfo" })
		.populate({ path: "adminConfirm1", select: "name" })
		.populate({ path: "adminConfirm2" , select: "name"})
		.lean();
	return jobs;
};

export { getOneJobService, getListJobService, getOneJobFullInfoService, getListJobFullInfoService };
