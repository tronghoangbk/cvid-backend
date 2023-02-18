import { IDepartment } from "../interfaces/department.interface";
import departmentModel from "../models/department.model";
import { removeUndefinedOfObj } from "./other.service";

const getOneDepartment = async (query: object) => {
	query = removeUndefinedOfObj(query);
	let department: IDepartment | null = await departmentModel.findOne(query).populate({ path: "companyInfo" }).lean();;
	return department;
};

const getListDepartment = async (query: object) => {
	query = removeUndefinedOfObj(query);
	let departments = await departmentModel.find(query).populate({ path: "companyInfo" }).lean();
	return departments;
};



export { getOneDepartment, getListDepartment };
