import { ICompany } from "./company.interface";
import { IDepartment } from "./department.interface";

export interface IJob {
	_id: string;
	companyId: string;
	departmentId: string;
	companyInfo: ICompany;
	departmentInfo: IDepartment;
	title: string;
	position: string;
	level: string[];
	major: string[];
	industry: string;
	location: string;
	workingEnvironment: string;
	experience: string;
	quantity: number;
	minSalary: number;
	maxSalary: number;
	description: string;
	confirm1: object;
	confirm2: object;
	status: boolean;
	createdAt: string;
	updatedAt: string;
	questions: Array<object>;
}
