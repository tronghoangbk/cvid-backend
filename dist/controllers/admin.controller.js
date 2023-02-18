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
exports.notConfirmJob = exports.cancelConfirmJob = exports.confirmJob = exports.notConfirmCompany = exports.cancelConfirmCompany = exports.confirmCompany = exports.notConfirmResume = exports.login = exports.getRole = exports.cancelConfirmResume = exports.confirmResume = void 0;
const employee_model_1 = __importDefault(require("../models/employee.model"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const company_model_1 = __importDefault(require("../models/company.model"));
const model_service_1 = require("../services/model.service");
const errorResponse_constant_1 = require("../constant/errorResponse.constant");
const other_service_1 = require("../services/other.service");
const job_model_1 = __importDefault(require("../models/job.model"));
const confirmResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, times } = req.params;
        const { note } = req.body;
        const adminId = req.body.user.id;
        const admin = yield (0, model_service_1.findOneService)(admin_model_1.default, { _id: adminId });
        if (!admin)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        const employee = yield (0, model_service_1.findOneService)(employee_model_1.default, { _id: id });
        if (!employee)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        let data = {
            confirmed: 1,
            confirmAt: new Date(),
            confirmBy: adminId,
            note: note,
        };
        if (times === "1") {
            const updatedEmployee = yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { confirm1: data });
        }
        else if (times === "2") {
            const updatedEmployee = yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id, "confirm1.confirmed": 1 }, { confirm2: data });
        }
        res.status(200).json({ message: "Confirm successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.confirmResume = confirmResume;
const cancelConfirmResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, times } = req.params;
        const { note } = req.body;
        const adminId = req.body.user.id;
        const admin = yield (0, model_service_1.findOneService)(admin_model_1.default, { _id: adminId });
        if (!admin)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        const employee = yield (0, model_service_1.findOneService)(employee_model_1.default, { _id: id });
        if (!employee)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        let data = {
            confirmed: 0,
            confirmAt: new Date(),
            confirmBy: adminId,
            note: note,
        };
        if (times === "1") {
            const updatedEmployee = yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { confirm1: data });
        }
        else if (times === "2") {
            const updatedEmployee = yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { confirm2: data });
        }
        res.status(200).json({ message: "Cancel confirm successfully" });
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.cancelConfirmResume = cancelConfirmResume;
const notConfirmResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, times } = req.params;
        const { note } = req.body;
        const adminId = req.body.user.id;
        const admin = yield (0, model_service_1.findOneService)(admin_model_1.default, { _id: adminId });
        if (!admin)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        const employee = yield (0, model_service_1.findOneService)(employee_model_1.default, { _id: id });
        if (!employee)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        let data = {
            confirmed: -1,
            confirmAt: new Date(),
            confirmBy: adminId,
            note: note,
        };
        if (times === "1") {
            const updatedEmployee = yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { confirm1: data });
        }
        else if (times === "2") {
            const updatedEmployee = yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { confirm2: data });
        }
        res.status(200).json({ message: "Not confirm successfully" });
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.notConfirmResume = notConfirmResume;
const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.user.id;
        const admin = yield (0, model_service_1.findOneService)(admin_model_1.default, { _id: id });
        if (!admin)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        res.status(200).json({ roles: admin.roles, message: "Get role successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.getRole = getRole;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const admin = yield (0, model_service_1.findOneService)(admin_model_1.default, { username });
        if (!admin)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        const isMatch = yield (0, other_service_1.comparePassword)(password, admin.password);
        if (!isMatch)
            return res.status(400).json({ message: errorResponse_constant_1.errorResponse["INVALID_PASSWORD"] });
        const token = (0, other_service_1.generateToken)({ id: admin._id, role: "admin" }, "1d");
        res.status(200).json({ user: admin, token, message: "Login successfully" });
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.login = login;
const confirmCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, times } = req.params;
        const { note } = req.body;
        const adminId = req.body.user.id;
        const admin = yield (0, model_service_1.findOneService)(admin_model_1.default, { _id: adminId });
        if (!admin)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        const company = yield (0, model_service_1.findOneService)(company_model_1.default, { _id: id });
        if (!company)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        let data = {
            confirmed: 1,
            confirmAt: new Date(),
            confirmBy: adminId,
            note: note,
        };
        if (times === "1") {
            const updatedCompany = yield (0, model_service_1.updateOneService)(company_model_1.default, { _id: id }, { confirm1: data });
        }
        else if (times === "2") {
            const updatedCompany = yield (0, model_service_1.updateOneService)(company_model_1.default, { _id: id, "confirm1.confirmed": 1 }, { confirm2: data });
        }
        res.status(200).json({ message: "Confirm successfully" });
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.confirmCompany = confirmCompany;
const cancelConfirmCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, times } = req.params;
        const { note } = req.body;
        const adminId = req.body.user.id;
        const admin = yield (0, model_service_1.findOneService)(admin_model_1.default, { _id: adminId });
        if (!admin)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        const company = yield (0, model_service_1.findOneService)(company_model_1.default, { _id: id });
        if (!company)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        let data = {
            confirmed: 0,
            confirmAt: new Date(),
            confirmBy: adminId,
            note: note,
        };
        if (times === "1") {
            const updatedCompany = yield (0, model_service_1.updateOneService)(company_model_1.default, { _id: id }, { confirm1: data });
        }
        else if (times === "2") {
            const updatedCompany = yield (0, model_service_1.updateOneService)(company_model_1.default, { _id: id }, { confirm2: data });
        }
        res.status(200).json({ message: "Cancel confirm successfully" });
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.cancelConfirmCompany = cancelConfirmCompany;
const notConfirmCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, times } = req.params;
        const { note } = req.body;
        const adminId = req.body.user.id;
        const admin = yield (0, model_service_1.findOneService)(admin_model_1.default, { _id: adminId });
        if (!admin)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        const company = yield (0, model_service_1.findOneService)(company_model_1.default, { _id: id });
        if (!company)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        let data = {
            confirmed: -1,
            confirmAt: new Date(),
            confirmBy: adminId,
            note: note,
        };
        if (times === "1") {
            const updatedCompany = yield (0, model_service_1.updateOneService)(company_model_1.default, { _id: id }, { confirm1: data });
        }
        else if (times === "2") {
            const updatedCompany = yield (0, model_service_1.updateOneService)(company_model_1.default, { _id: id }, { confirm2: data });
        }
        res.status(200).json({ message: "Not confirm successfully" });
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.notConfirmCompany = notConfirmCompany;
const confirmJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, times } = req.params;
        const { note } = req.body;
        const adminId = req.body.user.id;
        const admin = yield (0, model_service_1.findOneService)(admin_model_1.default, { _id: adminId });
        if (!admin)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        const job = yield (0, model_service_1.findOneService)(job_model_1.default, { _id: id });
        if (!job)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["NOT_FOUND"] });
        let data = {
            confirmed: 1,
            confirmAt: new Date(),
            confirmBy: adminId,
            note: note,
        };
        if (times === "1") {
            let updatedJob = yield (0, model_service_1.updateOneService)(job_model_1.default, { _id: id }, { confirm1: data });
        }
        else if (times === "2") {
            let updatedJob = yield (0, model_service_1.updateOneService)(job_model_1.default, { _id: id, "confirm1.confirmed": 1 }, { confirm2: data });
        }
        res.status(200).json({ message: "Confirm successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.confirmJob = confirmJob;
const cancelConfirmJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, times } = req.params;
        const { note } = req.body;
        const adminId = req.body.user.id;
        const admin = yield (0, model_service_1.findOneService)(admin_model_1.default, { _id: adminId });
        if (!admin)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        let data = {
            confirmed: 0,
            confirmAt: new Date(),
            confirmBy: adminId,
            note: note,
        };
        if (times === "1") {
            let updatedJob = yield (0, model_service_1.updateOneService)(job_model_1.default, { _id: id }, { confirm1: data });
        }
        else if (times === "2") {
            let updatedJob = yield (0, model_service_1.updateOneService)(job_model_1.default, { _id: id }, { confirm2: data });
        }
        res.status(200).json({ message: "Cancel confirm successfully" });
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.cancelConfirmJob = cancelConfirmJob;
const notConfirmJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, times } = req.params;
        const { note } = req.body;
        const adminId = req.body.user.id;
        const admin = yield (0, model_service_1.findOneService)(admin_model_1.default, { _id: adminId });
        if (!admin)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        let data = {
            confirmed: -1,
            confirmAt: new Date(),
            confirmBy: adminId,
            note: note,
        };
        if (times === "1") {
            yield (0, model_service_1.updateOneService)(job_model_1.default, { _id: id }, { confirm1: data });
        }
        else if (times === "2") {
            yield (0, model_service_1.updateOneService)(job_model_1.default, { _id: id }, { confirm2: data });
        }
        res.status(200).json({ message: "Not confirm successfully" });
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.notConfirmJob = notConfirmJob;
