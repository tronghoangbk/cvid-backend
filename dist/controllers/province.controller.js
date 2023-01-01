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
exports.getListWard = exports.getListDistrict = exports.getListProvince = exports.createMany = exports.getAll = void 0;
const province_model_1 = __importDefault(require("../models/province.model"));
const model_service_1 = require("../services/model.service");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const positions = yield (0, model_service_1.findManyService)(province_model_1.default, {});
        res.status(200).json({ data: positions, message: "Get all positions successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getAll = getAll;
const getListProvince = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let provinces = yield (0, model_service_1.findManyService)(province_model_1.default, {});
        provinces = provinces.map((item) => item.name);
        res.status(200).json({ data: provinces, message: "Get list provinces successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getListProvince = getListProvince;
const getListDistrict = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { province } = req.params;
        let districts = yield (0, model_service_1.findOneService)(province_model_1.default, { name: province });
        districts = districts.district;
        districts = districts.map((item) => item.name);
        res.status(200).json({ data: districts, message: "Get list districts successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getListDistrict = getListDistrict;
const getListWard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { province, district } = req.params;
        let provinces = yield (0, model_service_1.findOneService)(province_model_1.default, { name: province });
        let districts = provinces.district;
        let wards = districts.find((item) => item.name === district);
        console.log(wards);
        wards = wards.ward;
        wards = wards.map((item) => item.name);
        res.status(200).json({ data: wards, message: "Get list wards successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getListWard = getListWard;
const createMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        yield Promise.all(data.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, model_service_1.createService)(province_model_1.default, item);
        })));
        res.status(200).json({ message: "Create positions successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createMany = createMany;
