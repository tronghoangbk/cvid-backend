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
exports.getAllListMajor = exports.getListMajorByLevel = exports.getListLevel = exports.createMany = exports.getAll = void 0;
const major_model_1 = __importDefault(require("../models/major.model"));
const model_service_1 = require("../services/model.service");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const majors = yield (0, model_service_1.findManyService)(major_model_1.default, {});
        res.status(200).json({ data: majors, message: "Get all majors successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getAll = getAll;
const createMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        yield Promise.all(data.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, model_service_1.createService)(major_model_1.default, item);
        })));
        res.status(200).json({ message: "Create majors successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createMany = createMany;
const getListLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let majors = yield (0, model_service_1.findManyService)(major_model_1.default, {});
        majors = majors.map((item) => item.level);
        res.status(200).json({ data: majors, message: "Get list levels successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getListLevel = getListLevel;
const getListMajorByLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { level } = req.params;
        let majors = yield (0, model_service_1.findOneService)(major_model_1.default, { level });
        majors = majors.majors;
        res.status(200).json({ data: majors, message: "Get list majors by level successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getListMajorByLevel = getListMajorByLevel;
const getAllListMajor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let majors = yield (0, model_service_1.findManyService)(major_model_1.default, {});
        let listMajors = new Set();
        majors.forEach((item) => {
            item.majors.forEach((major) => {
                listMajors.add(major);
            });
        });
        res.status(200).json({ data: listMajors, message: "Get list majors successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getAllListMajor = getAllListMajor;
