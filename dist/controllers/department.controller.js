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
exports.getDepartmentByKey = exports.getDepartmentForCompany = exports.createDepartment = void 0;
const department_model_1 = __importDefault(require("../models/department.model"));
const model_service_1 = require("../services/model.service");
const uuid_1 = require("uuid");
const department_service_1 = require("../services/department.service");
const createDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        data.key = (0, uuid_1.v4)();
        console.log(data);
        const department = yield (0, model_service_1.createService)(department_model_1.default, data);
        res.status(200).json({ data: department, message: "Create department successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createDepartment = createDepartment;
const getDepartmentForCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        if (!companyId)
            return res.status(400).json({ message: "Company id is required" });
        const departments = yield (0, model_service_1.findManyService)(department_model_1.default, { companyId });
        res.status(200).json({ data: departments, message: "Get all departments successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getDepartmentForCompany = getDepartmentForCompany;
const getDepartmentByKey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.params;
        const department = yield (0, department_service_1.getOneDepartment)({ key });
        res.status(200).json({ data: department, message: "Get department successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getDepartmentByKey = getDepartmentByKey;
