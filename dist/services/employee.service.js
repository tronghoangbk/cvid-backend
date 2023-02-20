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
exports.getListEmployeeFullInfo = exports.getOneEmployeeFullInfo = exports.getListEmployee = exports.getOneEmployee = void 0;
const employee_model_1 = __importDefault(require("../models/employee.model"));
const other_service_1 = require("./other.service");
const getOneEmployee = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let employee = yield employee_model_1.default.findOne(query, { password: 0, username: 0, email: 0, address: 0 });
    return employee;
});
exports.getOneEmployee = getOneEmployee;
const getOneEmployeeFullInfo = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let employee = yield employee_model_1.default.findOne(query, { password: 0 });
    return employee;
});
exports.getOneEmployeeFullInfo = getOneEmployeeFullInfo;
const getListEmployee = (query) => __awaiter(void 0, void 0, void 0, function* () {
    query = (0, other_service_1.removeUndefinedOfObj)(query);
    let employees = yield employee_model_1.default.find(query, { password: 0, username: 0, email: 0, address: 0 });
    return employees;
});
exports.getListEmployee = getListEmployee;
const getListEmployeeFullInfo = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let employees = yield employee_model_1.default.find(query, { password: 0 });
    return employees;
});
exports.getListEmployeeFullInfo = getListEmployeeFullInfo;
const getListEmployeeWithPagination = (query, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    let employees = employee_model_1.default.find(query, { password: 0, username: 0, email: 0, address: 0 }).skip((page - 1) * limit).limit(limit);
    return employees;
});
