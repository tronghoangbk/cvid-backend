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
exports.getListJobService = exports.getOneJobService = void 0;
const job_model_1 = __importDefault(require("../models/job.model"));
const other_service_1 = require("./other.service");
const getOneJobService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    query = (0, other_service_1.removeUndefinedOfObj)(query);
    let job = job_model_1.default.findOne(query).populate({ path: "companyInfo" }).populate({ path: "departmentInfo" }).lean();
    return job;
});
exports.getOneJobService = getOneJobService;
const getListJobService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    query = (0, other_service_1.removeUndefinedOfObj)(query);
    let jobs = job_model_1.default.find(query).populate({ path: "companyInfo" }).populate({ path: "departmentInfo" }).lean();
    return jobs;
});
exports.getListJobService = getListJobService;
