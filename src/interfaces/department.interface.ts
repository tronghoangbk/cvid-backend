import { ICompany } from './company.interface';
export interface IDepartment {
    _id: string;
    companyId: string;
    departmentName: string;
    key: string;
    managerName: string;
    managerEmail: string;
    createdAt: string;
    updatedAt: string;
    companyInfo: ICompany;
}