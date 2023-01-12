"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const admin_model_1 = __importDefault(require("./admin.model"));
const Schema = mongoose_1.default.Schema;
const companies = new Schema({
    username: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    businessLicense: { type: String, required: true },
    companyType: { type: String },
    companyPhone: { type: String },
    representative: { type: String },
    managedBy: { type: String },
    typeOfBusiness: { type: String },
    openDate: { type: Date },
    engName: { type: String },
    sortName: { type: String },
    mainIndustry: { type: String },
    field: { type: Array },
    country: { type: String },
    address: { type: String },
    name: { type: String },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    position: { type: String },
    password: { type: String, required: true },
    departments: [
        {
            departmentName: { type: String, required: true, unique: true },
            key: { type: String, required: true, unique: true },
            managerName: { type: String },
            managerEmail: { type: String },
            jobs: [
                {
                    title: { type: String, required: true, unique: true },
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
                    updateDate: { type: Date, default: Date.now },
                },
            ],
        },
    ],
    confirmPhone: { type: Boolean, default: false },
    confirmEmail: { type: Boolean, default: false },
    confirmIdentity: { type: Boolean, default: false },
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
    status: { type: String },
}, {
    timestamps: true,
});
companies.virtual("adminConfirm1", {
    ref: admin_model_1.default,
    localField: "confirm1.confirmBy",
    foreignField: "_id",
    justOne: true, // for many-to-1 relationships
});
companies.virtual("adminConfirm2", {
    ref: admin_model_1.default,
    localField: "confirm2.confirmBy",
    foreignField: "_id",
    justOne: true, // for many-to-1 relationships
});
exports.default = mongoose_1.default.model("company", companies);
