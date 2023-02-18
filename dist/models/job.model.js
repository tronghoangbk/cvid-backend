"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const department_model_1 = __importDefault(require("./department.model"));
const company_model_1 = __importDefault(require("./company.model"));
const Schema = mongoose_1.default.Schema;
const Job = new Schema({
    companyId: { type: Schema.Types.ObjectId, ref: "company" },
    departmentId: { type: Schema.Types.ObjectId, ref: "department" },
    title: { type: String, required: true },
    position: { type: String },
    level: { type: Array },
    major: { type: Array },
    industry: { type: String },
    location: { type: String },
    workingEnvironment: { type: String },
    experience: { type: String },
    quantity: { type: Number },
    minSalary: { type: Number },
    maxSalary: { type: Number },
    description: { type: String },
    confirm1: {
        confirmed: { type: Number, default: 0 },
        confirmAt: { type: Date, default: Date.now },
        confirmBy: { type: Schema.Types.ObjectId },
        note: { type: String },
    },
    confirm2: {
        confirmed: { type: Number, default: 0 },
        confirmAt: { type: Date, default: Date.now },
        confirmBy: { type: Schema.Types.ObjectId },
        note: { type: String },
    },
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    questions: { type: Array, default: [] },
}, {
    timestamps: true,
});
Job.virtual("departmentInfo", {
    ref: department_model_1.default,
    localField: "departmentId",
    foreignField: "_id",
    justOne: true, // for many-to-1 relationships
});
Job.virtual("companyInfo", {
    ref: company_model_1.default,
    localField: "companyId",
    foreignField: "_id",
    justOne: true, // for many-to-1 relationships
});
exports.default = mongoose_1.default.model("job", Job);
