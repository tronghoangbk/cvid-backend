import jobModel from "../models/job.model";
import { removeUndefinedOfObj } from "./other.service";
const getOneJobService = async (query: Object) => {
	query = removeUndefinedOfObj(query);
	let job = jobModel.findOne(query).populate({ path: "companyInfo" }).populate({ path: "departmentInfo" }).lean();
	return job;
};

const getListJobService = async (query: Object) => {
	query = removeUndefinedOfObj(query);
	let jobs = jobModel.find(query).populate({ path: "companyInfo" }).populate({ path: "departmentInfo" }).lean();
	return jobs;
};

export { getOneJobService, getListJobService };
