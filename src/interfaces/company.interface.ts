export interface ICompany {
    _id: string;
    companyName: string;
    companyEmail: string;
    companyPhone: string;
    representative: string;
    managedBy: string;
    typeOfBusiness: string;
    openDate: string;
    engName: string;
    sortName: string;
    mainIndustry: string;
    field: string[];
    country: string;
    address: string;
    name: string;
    phone: string;
    email: string;
    position: string;
    password: string;
    confirmPhone: boolean;
    confirmEmail: boolean;
    confirmIdentity: boolean;
    confirm1: {
        confirmed: number;
        confirmAt: string;
        confirmBy: string;
        note: string;
    };
    confirm2: {
        confirmed: number;
        confirmAt: string;
        confirmBy: string;
        note: string;
    };
    status: string;
    createdAt: string;
    updatedAt: string;
    adminConfirm1: {
        _id: string;
        username: string;
        name: string;
    };
    adminConfirm2: {
        _id: string;
        username: string;
        name: string;
    };
}
