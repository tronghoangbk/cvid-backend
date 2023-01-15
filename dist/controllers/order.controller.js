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
exports.getOrdersByCompany = exports.getOrdersByEmployee = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const model_service_1 = require("../services/model.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log(data);
        yield (0, model_service_1.createService)(order_model_1.default, data);
        res.status(200).json({ message: "Create orders successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createOrder = createOrder;
// Lấy các việc đã chọn cuar userId
const getOrdersByEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.params;
        const { status } = req.query;
        const orders = yield (0, model_service_1.findManyService)(order_model_1.default, { employeeId, sender: "employee", status });
        res.status(200).json({ data: orders, message: "Get all orders successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getOrdersByEmployee = getOrdersByEmployee;
const getOrdersByCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        const { status } = req.query;
        const orders = yield (0, model_service_1.findManyService)(order_model_1.default, { companyId, sender: "company", status });
        res.status(200).json({ data: orders, message: "Get all orders successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getOrdersByCompany = getOrdersByCompany;
