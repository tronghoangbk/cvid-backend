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
exports.gẹtJobDetail = exports.getEmployeeForJob = exports.createJob = exports.getJobForDepartment = exports.getAllJob = void 0;
const job_service_1 = require("../services/job.service");
const job_model_1 = __importDefault(require("../models/job.model"));
const model_service_1 = require("../services/model.service");
const employee_service_1 = require("../services/employee.service");
const order_service_1 = require("../services/order.service");
const getAllJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield (0, job_service_1.getListJobFullInfoService)({});
        res.status(200).json({ data: jobs, message: "Get all jobs successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getAllJob = getAllJob;
const getJobForDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { departmentId, key } = req.params;
        const jobs = yield (0, job_service_1.getListJobService)({ departmentId, key });
        res.status(200).json({ data: jobs, message: "Get all jobs successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getJobForDepartment = getJobForDepartment;
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log(data);
        const job = yield (0, model_service_1.createService)(job_model_1.default, data);
        res.status(200).json({ data: job, message: "Create job successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createJob = createJob;
const getEmployeeForJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobId } = req.params;
        const { school } = req.body;
        console.log(school);
        const jobs = yield (0, job_service_1.getOneJobService)({ _id: jobId, "confirm2.confirmed": 1 });
        if (!jobs)
            return res.status(404).json({ message: "Job not found" });
        yield (0, model_service_1.updateOneService)(job_model_1.default, { _id: jobId }, { $set: { status: true } });
        let query = {
            "jobCriteria.jobTitle": jobs.title,
            "confirm1.confirmed": 1,
            "confirm2.confirmed": 1,
            "jobCriteria.status": true,
            "jobCriteria.major": { $in: jobs.major },
            school,
        };
        let listEmployee = yield (0, employee_service_1.getListEmployee)(query);
        let listOrder = yield (0, order_service_1.getListOrderService)({ jobId });
        let list = listEmployee.filter(item => {
            let check = true;
            listOrder.forEach(order => {
                if (order.employeeId == item._id)
                    check = false;
            });
            return check;
        });
        res.status(200).json({ data: list, message: "Get all employees successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getEmployeeForJob = getEmployeeForJob;
const gẹtJobDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const job = yield (0, job_service_1.getOneJobService)({ _id: id });
        if (!job)
            return res.status(404).json({ message: "Job not found" });
        res.status(200).json({ data: job, message: "Get job detail successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.gẹtJobDetail = gẹtJobDetail;
