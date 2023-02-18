import employeeModel from "../models/employee.model";
const getOneEmployee = async (query: object) => {
	let employee = await  employeeModel.findOne(query, { password: 0, username: 0, email: 0, address: 0 });
	return employee;
};

const getOneEmployeeFullInfo = async (query: object) => {
    let employee = await employeeModel.findOne(query, { password: 0 })
    return employee;
}

const getListEmployee = async (query: object) => {
	let employees = await  employeeModel.find(query, { password: 0, username: 0, email: 0, address: 0 });
	return employees;
};

const getListEmployeeFullInfo = async (query: object) => {
    let employees = await employeeModel.find(query, { password: 0 })
    return employees;
}

const getListEmployeeWithPagination = async (query: object, page: number, limit: number) => {
    let employees = employeeModel.find(query, { password: 0, username: 0, email: 0, address: 0 }).skip((page - 1) * limit).limit(limit);
    return employees;
};



export { getOneEmployee, getListEmployee, getOneEmployeeFullInfo, getListEmployeeFullInfo };
