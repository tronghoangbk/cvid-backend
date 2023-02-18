import adminModel from "../models/admin.model";
import CompanyModel from "../models/company.model";
import { removeUndefinedOfObj } from "./other.service";

const getOneCompanyService = async (query: object) => {
    query = removeUndefinedOfObj(query);
    let company = await CompanyModel.findOne(query);
    return company;
};

const getListCompanyService = async (query: any) => {
    query = removeUndefinedOfObj(query);
    let companies = await CompanyModel.find(query);
    return companies;
};

export { getOneCompanyService, getListCompanyService };
