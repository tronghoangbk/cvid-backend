"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const admin_model_1 = __importDefault(require("./admin.model"));
const Schema = mongoose_1.default.Schema;
const employees = new Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    birthday: { type: Date },
    gender: { type: String },
    password: { type: String, required: true },
    ID: { type: String },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: "https://static.thenounproject.com/png/5034901-200.png" },
    country: { type: String },
    province: { type: String },
    district: { type: String },
    ward: { type: String },
    address: { type: String },
    level: { type: String },
    school: { type: String },
    startYear: { type: Date },
    endYear: { type: Date },
    major: { type: String },
    jobTitle: { type: String },
    confirmPhone: { type: Boolean, default: false },
    confirmEmail: { type: Boolean, default: false },
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
    otp: { type: String },
    confirmIdentity: { type: Boolean, default: false },
    pointList: [{ type: Number, default: new Array(15).fill(0) }],
    points: { type: Number, default: 0 },
    skillLanguage: [{ type: Object }],
    jobCriteria: {
        jobTitle: { type: String, default: '' },
        province: { type: String, default: '' },
        district: { type: String, default: '' },
        ward: { type: String },
        major: { type: String, default: '' },
        environment: { type: Array, default: [] },
        position: { type: Array, default: [] },
        industry: { type: Array, default: [] },
        companyType: { type: String, default: '' },
        status: { type: Boolean, default: false },
    },
    skillOther: [{ type: Object }],
    workExperience: [
        {
            company: { type: String, required: true },
            start: { type: Date },
            end: { type: Date },
            address: { type: String },
            leaving: { type: String },
            process: { type: Array },
            isWorking: { type: Boolean, default: true },
            isCurrent: { type: Boolean, default: false },
        },
    ],
    skillEducation: [
        {
            level: { type: String, required: true },
            school: { type: String, required: true },
            start: { type: Date },
            end: { type: Date },
            major: { type: String, required: true },
            jobTitle: { type: String, required: true },
        },
    ],
    shortTraining: [
        {
            certificate: { type: String, required: true },
            organizer: { type: String, required: true },
            start: { type: Date },
            end: { type: Date },
        },
    ],
}, {
    timestamps: true,
});
employees.virtual("adminConfirm1", {
    ref: admin_model_1.default,
    localField: "confirm1.confirmBy",
    foreignField: "_id",
    justOne: true, // for many-to-1 relationships
});
employees.virtual("adminConfirm2", {
    ref: admin_model_1.default,
    localField: "confirm2.confirmBy",
    foreignField: "_id",
    justOne: true, // for many-to-1 relationships
});
exports.default = mongoose_1.default.model("employee", employees);
