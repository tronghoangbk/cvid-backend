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
exports.getEmployeeCount = exports.getMyReSume = exports.verified = exports.verifyEmail = exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.getAllEmployee = exports.createCV = exports.register = exports.login = void 0;
const employee_model_1 = __importDefault(require("../models/employee.model"));
const model_service_1 = require("../services/model.service");
const mail_service_1 = require("../services/mail.service");
const errorResponse_constant_1 = require("../constant/errorResponse.constant");
const fs_1 = __importDefault(require("fs"));
const default_constant_1 = require("../constant/default.constant");
const other_service_1 = require("../services/other.service");
const employee_model_2 = __importDefault(require("../models/employee.model"));
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
        res.status(200).json({ employees: employees, message: "Get all employees successfully" });
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
        res.status(200).json({ employee: employee, message: "Get employee successfully" });
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
