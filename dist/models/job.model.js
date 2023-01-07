"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const admin_model_1 = __importDefault(require("./admin.model"));
const employee_model_1 = __importDefault(require("./employee.model"));
const Schema = mongoose_1.default.Schema;
const job = new Schema({
    jobId: { type: Schema.Types.ObjectId },
    employeeId: { type: Schema.Types.ObjectId, ref: "employee" },
    sender: { type: String, enum: ["employee", "company"] },
    interview: {
        date: { type: Date },
        time: { type: String },
        address: { type: String },
        interviewer: { type: String },
        interviewerEmail: { type: String },
        interviewerPhone: { type: String },
        status: { type: String, enum: ["pending", "confirmed", "rejected"] },
        note: { type: String },
    },
    payment: {
        amount: { type: Number },
        status: { type: String, enum: ["pending", "confirmed", "rejected"] },
        note: { type: String },
    },
}, {
    timestamps: true,
});
job.virtual("jobInfo", {
    ref: admin_model_1.default,
    localField: "jobId",
    foreignField: "departments.jobs._id",
    justOne: true, // for many-to-1 relationships
});
job.virtual("employeeInfo", {
    ref: employee_model_1.default,
    localField: "employeeId",
    foreignField: "_id",
    justOne: true, // for many-to-1 relationships
});
exports.default = mongoose_1.default.model("job", job);
