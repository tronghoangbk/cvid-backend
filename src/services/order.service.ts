import Order from "../models/order.model";
import Employee from "../models/employee.model";
import Company from "../models/company.model";
import { removeUndefinedOfObj } from "./other.service";
import { queryExistService } from "./model.service";

const getListOrderService = async (query: object) => {
	query = removeUndefinedOfObj(query);
	const orders = await Order.find(query).populate({ path: "employeeInfo" }).populate({ path: "jobInfo" }).lean();
	orders.map((order: any) => {
		let departments = order.jobInfo.departments;
		departments.map((department: any) => {
			department.jobs.map((job: any) => {
				if (job._id.toString() === order.jobId.toString()) {
					order.jobInfo = job;
				}
			});
		});
	});
	return orders;
};

const checkOrderExistService = async (query: object) => {
	query = removeUndefinedOfObj(query);
	return await queryExistService(Order, query);
};
export { getListOrderService, checkOrderExistService };
