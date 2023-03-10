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
exports.createMany = exports.getAll = void 0;
const school_model_1 = __importDefault(require("../models/school.model"));
const model_service_1 = require("../services/model.service");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schools = yield (0, model_service_1.findManyService)(school_model_1.default, {});
        res.status(200).json({ data: schools, message: "Get all schools successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getAll = getAll;
const getListLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let schools = yield (0, model_service_1.findManyService)(school_model_1.default, {});
        schools = schools.map((item) => item.level);
        res.status(200).json({ data: schools, message: "Get list levels successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
const createMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        yield Promise.all(data.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, model_service_1.createService)(school_model_1.default, item);
        })));
        res.status(200).json({ message: "Create schools successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createMany = createMany;
