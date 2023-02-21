"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const employee_model_1 = __importDefault(require("./employee.model"));
const job_model_1 = __importDefault(require("./job.model"));
const Schema = mongoose_1.default.Schema;
const order = new Schema({
    jobId: { type: Schema.Types.ObjectId },
    employeeId: { type: Schema.Types.ObjectId },
    sender: { type: String, enum: ["employee", "company"] },
    rating: { type: String, enum: ["A", "B", "C"] },
    comment: { type: String },
    status: { type: String, enum: ["pending", "confirmed", "rejected"], default: "pending" },
    interview: {
        date: { type: Date },
        address: { type: String },
        interviewer: { type: String },
        interviewerEmail: { type: String },
        interviewerPhone: { type: String },
        status: { type: String, enum: ["pending", "confirmed", "rejected"], default: "pending" },
        note: { type: String },
    },
    payment: {
        amount: { type: Number },
        status: { type: String, enum: ["pending", "confirmed", "rejected"], default: "pending" },
        note: { type: String },
    },
}, {
    timestamps: true,
});
order.virtual("jobInfo", {
    ref: job_model_1.default,
    localField: "jobId",
    foreignField: "_id",
    justOne: true, // for many-to-1 relationships
});
order.virtual("employeeInfo", {
    ref: employee_model_1.default,
    localField: "employeeId",
    foreignField: "_id",
    justOne: true, // for many-to-1 relationships
});
exports.default = mongoose_1.default.model("order", order);
