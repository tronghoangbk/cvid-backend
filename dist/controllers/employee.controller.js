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
const employee_model_1 = __importDefault(require("../models/employee.model"));
const model_service_1 = require("../services/model.service");
const other_service_1 = require("../services/other.service");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield (0, model_service_1.findOneService)(employee_model_1.default, { username: username });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const isPasswordCorrect = (0, other_service_1.comparePassword)(password, user.password);
        if (!isPasswordCorrect)
            return res.status(401).json({ message: "Invalid credentials" });
        const token = (0, other_service_1.generateToken)({ id: user._id, username: user.username }, "1d");
        res.status(200).json({ userInfo: user, message: "Login successfully", token: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        newUser.password = (0, other_service_1.hashPassword)(newUser.password);
        const user = yield (0, model_service_1.createService)(employee_model_1.default, newUser);
        res.status(200).json({ userInfo: user, message: "Register successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
const createCV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body._id;
        yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, req.body);
        res.status(200).json({ message: "Create CV successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
const getAllEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield (0, model_service_1.findManyService)(employee_model_1.default, {});
        res.status(200).json({ employees: employees, message: "Get all employees successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
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
exports.default = { login, register, createCV };
