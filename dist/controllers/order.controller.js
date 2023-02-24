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
exports.updateInterview = exports.getOrdersByDepartment = exports.getOrdersByEmployee = exports.createOrder = void 0;
const order_service_1 = require("../services/order.service");
const order_model_1 = __importDefault(require("../models/order.model"));
const model_service_1 = require("../services/model.service");
const department_service_1 = require("../services/department.service");
const department_model_1 = __importDefault(require("../models/department.model"));
const job_model_1 = __importDefault(require("../models/job.model"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        data.sender = req.body.user.role;
        let isExistService = yield (0, order_service_1.checkOrderExistService)({ jobId: data.jobId, employeeId: data.employeeId });
        if (isExistService)
            return res.status(400).json({ message: "Order already exist" });
        yield (0, model_service_1.createService)(order_model_1.default, data);
        res.status(200).json({ message: "Create orders successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createOrder = createOrder;
const getOrdersByEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeId = req.body.user.id;
        const { sender, status } = req.body;
        const orders = yield (0, order_service_1.getListOrderService)({ employeeId, sender, status });
        res.status(200).json({ data: orders, message: "Get all orders successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getOrdersByEmployee = getOrdersByEmployee;
const getOrdersByDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.params;
        const { sender } = req.body;
        const departmentId = yield (0, model_service_1.findOneService)(department_model_1.default, { key });
        const listJob = yield (0, model_service_1.findManyService)(job_model_1.default, { departmentId });
        let orders = [];
        yield Promise.all(listJob.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const order = yield (0, order_service_1.getListOrderService)({ jobId: item._id, sender });
            orders = [...orders, ...order];
        })));
        res.status(200).json({ data: orders, message: "Get all orders successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getOrdersByDepartment = getOrdersByDepartment;
const updateInterview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key, id } = req.params;
        const department = yield (0, department_service_1.getOneDepartment)({ key });
        if (!department)
            return res.status(400).json({ message: "Department not found" });
        const { date, address, interviewer, interviewerEmail, interviewerPhone, note } = req.body;
        const data = {
            interview: {
                date,
                address,
                interviewer,
                interviewerEmail,
                interviewerPhone,
                note,
            },
        };
        yield (0, model_service_1.updateOneService)(order_model_1.default, { _id: id }, data);
        res.status(200).json({ message: "Update interview successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.updateInterview = updateInterview;
