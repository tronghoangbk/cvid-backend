"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJobForDepartment = exports.createJobForDepartment = exports.getDepartmentByKey = exports.getCompanyCount = exports.createDepartment = exports.getInfoCompanyFromUri = exports.updateCompany = exports.getCompanyById = exports.getAllCompany = exports.verified = exports.verifyEmail = exports.getMyCompanyInfo = exports.register = exports.login = void 0;
const dom_parser_1 = __importDefault(require("dom-parser"));
const company_model_1 = __importDefault(require("../models/company.model"));
const uuid_1 = require("uuid");
const model_service_1 = require("../services/model.service");
const mail_service_1 = require("../services/mail.service");
const errorResponse_constant_1 = require("../constant/errorResponse.constant");
const fs_1 = __importDefault(require("fs"));
const default_constant_1 = require("../constant/default.constant");
const other_service_1 = require("../services/other.service");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield (0, model_service_1.findOneService)(company_model_1.default, { username: username });
        if (!user)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        const isPasswordCorrect = (0, other_service_1.comparePassword)(password, user.password);
        if (!isPasswordCorrect)
            return res.status(401).json({ message: errorResponse_constant_1.errorResponse["INVALID_PASSWORD"] });
        if (!user.confirmEmail)
            return res.status(403).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_CONFIRMED"] });
        const idToken = (0, other_service_1.generateToken)({ id: user._id, username: user.username }, "1d");
        res.status(200).json(Object.assign(Object.assign({}, user._doc), { idToken, expiresIn: "3600" }));
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        let userInfo = yield (0, model_service_1.findOneService)(company_model_1.default, { username: newUser.username });
        if (userInfo)
            return res.status(400).json({ message: errorResponse_constant_1.errorResponse["TAXCODE_EXISTS"] });
        userInfo = yield (0, model_service_1.findOneService)(company_model_1.default, { email: newUser.email });
        if (userInfo)
            return res.status(400).json({ message: errorResponse_constant_1.errorResponse["EMAIL_EXISTS"] });
        userInfo = yield (0, model_service_1.findOneService)(company_model_1.default, { phone: newUser.phone });
        if (userInfo)
            return res.status(400).json({ message: errorResponse_constant_1.errorResponse["PHONE_EXISTS"] });
        newUser.password = (0, other_service_1.hashPassword)(newUser.password);
        const user = yield (0, model_service_1.createService)(company_model_1.default, newUser);
        // Send email
        const subject = "Đăng ký thành công";
        let html = fs_1.default.readFileSync(`${default_constant_1.staticFolder}views/mailConfirm.html`, { encoding: "utf8" });
        let link = `${req.headers.host}/company/verify-email/${user._id}`;
        html = html.replace("{{link}}", link);
        yield (0, mail_service_1.sendEmail)(user.email, subject, html);
        res.status(200).json({ message: "Register successfully" });
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.register = register;
const getMyCompanyInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.body.user.id;
        const user = yield (0, model_service_1.findOneService)(company_model_1.default, { _id: userId });
        if (!user)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        delete user.password;
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.getMyCompanyInfo = getMyCompanyInfo;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, model_service_1.updateOneService)(company_model_1.default, { _id: id }, { confirmEmail: true });
        let message = "Xác thực email thành công";
        res.redirect(`/company/verified?message=${message}`);
    }
    catch (error) {
        let message = "Xác thực email thất bại";
        res.redirect(`/company/verified?error=true&message=${message}`);
    }
});
exports.verifyEmail = verifyEmail;
const verified = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.sendFile(`${default_constant_1.staticFolder}views/verified.html`);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.verified = verified;
const getAllCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, model_service_1.findManyService)(company_model_1.default, {});
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.getAllCompany = getAllCompany;
const getCompanyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, model_service_1.findOneService)(company_model_1.default, { _id: id });
        if (!user)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.getCompanyById = getCompanyById;
const updateCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, model_service_1.findOneService)(company_model_1.default, { _id: id });
        if (!user)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        const updatedUser = req.body;
        if (updatedUser.password)
            updatedUser.password = (0, other_service_1.hashPassword)(updatedUser.password);
        const newUser = yield (0, model_service_1.updateOneService)(company_model_1.default, { _id: id }, updatedUser);
        res.status(200).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.updateCompany = updateCompany;
const getInfoCompanyFromUri = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let url = `https://masothue.com/Search/?q=${id}&type=auto`;
        let htmlStr = yield (0, other_service_1.getDataFromURL)(url);
        const parser = new dom_parser_1.default();
        const document = parser.parseFromString(htmlStr);
        let result = document.getElementsByClassName("table-taxinfo");
        let CompanyInfo = {};
        let thead = result[0].getElementsByTagName("thead");
        CompanyInfo.companyName = thead[0].getElementsByTagName("th")[0].textContent;
        let tbody = result[0].getElementsByTagName("tbody");
        result = tbody[0].getElementsByTagName("tr");
        // CompanyInfo.name = tbody[0].getElementsByTagName("th")[0].textContent;
        result.forEach((item) => {
            item = item.getElementsByTagName("td");
            if (item[0].textContent.trim() === "Tên quốc tế")
                CompanyInfo.engName = item[1].textContent;
            if (item[0].textContent.trim() === "Tên viết tắt")
                CompanyInfo.sortName = item[1].textContent;
            if (item[0].textContent.trim() === "Mã số thuế")
                CompanyInfo.taxCode = item[1].textContent;
            if (item[0].textContent.trim() === "Địa chỉ")
                CompanyInfo.address = item[1].textContent;
            if (item[0].textContent.trim() === "Điện thoại")
                CompanyInfo.companyPhone = item[1].textContent;
            if (item[0].textContent.trim() === "Ngày hoạt động")
                CompanyInfo.openDate = item[1].textContent;
            if (item[0].textContent.trim() === "Người đại diện")
                CompanyInfo.representative = item[1].textContent;
            if (item[0].textContent.trim() === "Quản lý bởi")
                CompanyInfo.managedBy = item[1].textContent;
            if (item[0].textContent.trim() === "Tình trạng")
                CompanyInfo.status = item[1].textContent;
            if (item[0].textContent.trim() === "Loại hình DN")
                CompanyInfo.typeOfBusiness = item[1].textContent;
        });
        res.status(200).json(CompanyInfo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.getInfoCompanyFromUri = getInfoCompanyFromUri;
const createDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, model_service_1.findOneService)(company_model_1.default, { _id: id });
        if (!user)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        const { departmentName, managerName, managerEmail } = req.body;
        let key = (0, uuid_1.v4)();
        let newDepartment = {
            departmentName,
            managerName,
            managerEmail,
            key,
        };
        const newUser = yield (0, model_service_1.updateOneService)(company_model_1.default, { _id: id }, { $push: { departments: newDepartment } });
        res.status(200).json(newDepartment);
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.createDepartment = createDepartment;
// Lấy số lượng công ty đã tạo
const getCompanyCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield (0, model_service_1.countService)(company_model_1.default, {});
        res.status(200).json(count);
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.getCompanyCount = getCompanyCount;
const getDepartmentByKey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.params;
        const company = yield (0, model_service_1.findOneService)(company_model_1.default, { "departments.key": key });
        console.log(company);
        if (!company)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["NOT_FOUND"] });
        const department = company.departments.find((item) => item.key === key);
        res.status(200).json(department);
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.getDepartmentByKey = getDepartmentByKey;
const createJobForDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.params;
        const company = yield (0, model_service_1.findOneService)(company_model_1.default, { "departments.key": key });
        if (!company)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["NOT_FOUND"] });
        const department = company.departments.find((item) => item.key === key);
        const { title, position, level, major, industry, location, workingEnvironment, experience, quantity, minSalary, maxSalary, description, } = req.body;
        let newJob = {
            title,
            position,
            level,
            major,
            industry,
            location,
            workingEnvironment,
            experience,
            quantity,
            minSalary,
            maxSalary,
            description,
        };
        const newUser = yield (0, model_service_1.updateOneService)(company_model_1.default, { "departments.key": key }, { $push: { "departments.$.jobs": newJob } });
        res.status(200).json(newJob);
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.createJobForDepartment = createJobForDepartment;
const deleteJobForDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key, jobId } = req.params;
        const company = yield (0, model_service_1.findOneService)(company_model_1.default, { "departments.key": key });
        if (!company)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["NOT_FOUND"] });
        const department = company.departments.find((item) => item.key === key);
        const job = department.jobs.find((item) => item.key === key);
        yield (0, model_service_1.updateOneService)(company_model_1.default, { "departments.key": key }, { $pull: { "departments.$.jobs": { _id: jobId } } });
        res.status(200).json(job);
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.deleteJobForDepartment = deleteJobForDepartment;
