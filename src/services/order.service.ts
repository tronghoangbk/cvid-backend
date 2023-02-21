import { getListJobService } from "../services/job.service";
import Order from "../models/order.model";
import Employee from "../models/employee.model";
import Company from "../models/company.model";
import { removeUndefinedOfObj } from "./other.service";
import { queryExistService } from "./model.service";

const getListOrderService = async (query: object) => {
	query = removeUndefinedOfObj(query);
	const orders = await Order.find(query)
		.populate({ path: "employeeInfo", select: "jobCriteria" })
		.populate({ path: "jobInfo" })
		.lean();
	return orders;
};

const getListOrderFullInfoService = async (query: object) => {
	query = removeUndefinedOfObj(query);
	const orders = await Order.find(query).populate({ path: "employeeInfo" }).populate({ path: "jobInfo" }).lean();
	return orders;
};

const checkOrderExistService = async (query: object) => {
	query = removeUndefinedOfObj(query);
	return await queryExistService(Order, query);
};
export { getListOrderService, checkOrderExistService, getListOrderFullInfoService };
