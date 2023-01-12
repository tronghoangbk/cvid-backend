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
exports.findJob = exports.deleteWorkExperience = exports.addWorkExperience = exports.deleteShortTraining = exports.addShortTraining = exports.confirmPhone = exports.sendOTP = exports.deleteSchool = exports.addSchool = exports.getEmployeeCount = exports.getMyReSume = exports.verified = exports.verifyEmail = exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.getAllEmployee = exports.createCV = exports.register = exports.login = void 0;
const employee_model_1 = __importDefault(require("../models/employee.model"));
const model_service_1 = require("../services/model.service");
const mail_service_1 = require("../services/mail.service");
const errorResponse_constant_1 = require("../constant/errorResponse.constant");
const fs_1 = __importDefault(require("fs"));
const default_constant_1 = require("../constant/default.constant");
const other_service_1 = require("../services/other.service");
const employee_model_2 = __importDefault(require("../models/employee.model"));
const company_model_1 = __importDefault(require("../models/company.model"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield (0, model_service_1.findOneService)(employee_model_1.default, { username: username });
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
        newUser.jobCriteria = {
            // jobTitle: newUser.jobTitle,
            province: newUser.province,
            major: newUser.major,
        };
        let userInfo = yield (0, model_service_1.findOneService)(employee_model_1.default, { username: newUser.username });
        if (userInfo)
            return res.status(400).json({ message: errorResponse_constant_1.errorResponse["PHONE_EXISTS"] });
        userInfo = yield (0, model_service_1.findOneService)(employee_model_1.default, { email: newUser.email });
        if (userInfo)
            return res.status(400).json({ message: errorResponse_constant_1.errorResponse["EMAIL_EXISTS"] });
        newUser.password = (0, other_service_1.hashPassword)(newUser.password);
        const user = yield (0, model_service_1.createService)(employee_model_1.default, newUser);
        // Send email
        const subject = "Đăng ký thành công";
        let html = fs_1.default.readFileSync(`${default_constant_1.staticFolder}views/mailConfirm.html`, { encoding: "utf8" });
        let link = `${req.headers.host}/employee/verify-email/${user._id}`;
        html = html.replace("{{link}}", link);
        yield (0, mail_service_1.sendEmail)(user.email, subject, html);
        res.status(200).json({ message: "Register successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.register = register;
const getMyReSume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.body.user.id;
        let userInfo = yield (0, model_service_1.findOneService)(employee_model_2.default, { _id: userId });
        delete userInfo.password;
        res.status(200).json(Object.assign({}, userInfo));
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.getMyReSume = getMyReSume;
const createCV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params._id;
        (0, other_service_1.removeUndefinedOfObj)(req.body);
        yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, req.body);
        res.status(200).json({ message: "Create CV successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createCV = createCV;
const getAllEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield (0, model_service_1.findManyService)(employee_model_1.default, {});
        res.status(200).json({ data: employees, message: "Get all employees successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getAllEmployee = getAllEmployee;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const employee = yield (0, model_service_1.findOneService)(employee_model_1.default, { _id: id });
        res.status(200).json(employee);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getEmployeeById = getEmployeeById;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, req.body);
        res.status(200).json({ message: "Update employee successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield (0, model_service_1.deleteOneService)(employee_model_1.default, { _id: id });
        res.status(200).json({ message: "Delete employee successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.deleteEmployee = deleteEmployee;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { confirmEmail: true });
        let message = "Xác nhận email thành công";
        res.redirect(`/employee/verified?message=${message}`);
    }
    catch (error) {
        let message = "Xác nhận email thất bại";
        res.redirect(`/employee/verified?error=true&message=${message}`);
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
const getEmployeeCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield (0, model_service_1.countService)(employee_model_1.default, {});
        res.status(200).json(count);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getEmployeeCount = getEmployeeCount;
const addSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { school, level, major, start, end, jobTitle } = req.body;
        const newSchool = {
            school,
            level,
            major,
            start,
            end,
            jobTitle,
        };
        yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { $push: { skillEducation: newSchool } });
        res.status(200).json({ message: "Add school successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.addSchool = addSchool;
const deleteSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const schoolId = req.params.schoolId;
        yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { $pull: { skillEducation: { _id: schoolId } } });
        res.status(200).json({ message: "Delete school successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.deleteSchool = deleteSchool;
const addShortTraining = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { start, end, certificate, organizer } = req.body;
        const newShortTraining = {
            certificate,
            start,
            end,
            organizer,
        };
        yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { $push: { shortTraining: newShortTraining } });
        res.status(200).json({ message: "Add short training successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.addShortTraining = addShortTraining;
const deleteShortTraining = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const shortTrainingId = req.params.shortTrainingId;
        yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { $pull: { shortTraining: { _id: shortTrainingId } } });
        res.status(200).json({ message: "Delete short training successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.deleteShortTraining = deleteShortTraining;
const addWorkExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let { start, end, company, address, leaving, process } = req.body;
        start = process[0].from;
        end = process[process.length - 1].to;
        const newWorkExperience = {
            start,
            end,
            company,
            address,
            leaving,
            process,
        };
        yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { $push: { workExperience: newWorkExperience } });
        res.status(200).json({ message: "Add work experience successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.addWorkExperience = addWorkExperience;
const deleteWorkExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, workId } = req.params;
        yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { $pull: { workExperience: { _id: workId } } });
        res.status(200).json({ message: "Delete work experience successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.deleteWorkExperience = deleteWorkExperience;
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { phone } = req.body;
        let user = yield (0, model_service_1.findOneService)(employee_model_1.default, { _id: id });
        if (!user) {
            return res.status(400).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        }
        let checkExist = yield (0, model_service_1.findOneService)(employee_model_1.default, { username: phone, _id: { $ne: id } });
        if (checkExist) {
            return res.status(400).json({ message: errorResponse_constant_1.errorResponse["PHONE_EXISTS"] });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        let message = `Mã OTP của bạn là ${otp}`;
        console.log(message);
        const token = (0, other_service_1.generateToken)({ otp, phone }, "10m");
        yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { otp: token, username: phone });
        res.status(200).json({ message: "Send OTP successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.sendOTP = sendOTP;
const confirmPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { otp } = req.body;
        let user = yield (0, model_service_1.findOneService)(employee_model_1.default, { _id: id });
        if (!user) {
            return res.status(400).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        }
        if (!user.otp) {
            return res.status(400).json({ message: errorResponse_constant_1.errorResponse["NOT_FOUND"] });
        }
        const decoded = (0, other_service_1.verifyToken)(user.otp);
        console.log(decoded.otp, otp);
        // if (decoded.otp != otp) {
        // 	return res.status(400).json({ message: errorResponse["OTP_INVALID"] });
        // }
        yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { otp: null, confirmPhone: true, username: decoded.phone });
        res.status(200).json({ message: "Confirm phone successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.confirmPhone = confirmPhone;
const findJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let jobCriteria = req.body;
        jobCriteria = (0, other_service_1.removeUndefinedOfObj)(jobCriteria);
        yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { jobCriteria });
        console.log('jobCriteria', jobCriteria);
        let query = {
            companyType: jobCriteria.companyType,
            "departments.jobs.industry": jobCriteria.industry,
            "departments.jobs.location": jobCriteria.province,
            "departments.jobs.major": { $all: jobCriteria.major },
            "departments.jobs.title": jobCriteria.jobTitle,
        };
        let listCompany = yield (0, model_service_1.findManyService)(company_model_1.default, query);
        let listJob = [];
        listCompany.forEach((company) => {
            company.departments.forEach((department) => {
                department.jobs.forEach((job) => {
                    let flag = true;
                    if (!job.major.includes(jobCriteria.major)) {
                        flag = false;
                    }
                    if (jobCriteria.province && job.location != jobCriteria.province) {
                        flag = false;
                    }
                    if (jobCriteria.industry && job.industry != jobCriteria.industry) {
                        flag = false;
                    }
                    if (jobCriteria.jobTitle && job.title != jobCriteria.jobTitle) {
                        flag = false;
                    }
                    if (flag) {
                        listJob.push(job);
                    }
                });
            });
        });
        console.log('listJob', listJob);
        res.status(200).json({ message: "Find job successfully", data: listJob });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.findJob = findJob;
