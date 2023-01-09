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
exports.cancelConfirmResume = exports.confirmResume = void 0;
const employee_model_1 = __importDefault(require("../models/employee.model"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const model_service_1 = require("../services/model.service");
const errorResponse_constant_1 = require("../constant/errorResponse.constant");
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
            confirmDate: new Date(),
            confirmBy: id,
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
            confirmDate: new Date(),
            confirmBy: id,
            note: note,
        };
        if (times === "1") {
            const updatedEmployee = yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id }, { confirm1: data });
        }
        else if (times === "2") {
            const updatedEmployee = yield (0, model_service_1.updateOneService)(employee_model_1.default, { _id: id, "confirm1.confirmed": 1 }, { confirm2: data });
        }
        res.status(200).json({ message: "Cancel confirm successfully" });
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.cancelConfirmResume = cancelConfirmResume;
