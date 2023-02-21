import mongoose from "mongoose";
import CompanyModel from "./company.model";
import EmployeeModel from "./employee.model";
import JobModel from "./job.model";

const Schema = mongoose.Schema;
const order = new Schema(
	{
        jobId: { type: Schema.Types.ObjectId, required: true },
        employeeId: { type: Schema.Types.ObjectId, required: true },
        sender: { type: String, enum: ["employee", "company"], required: true },
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
	},
	{
		timestamps: true,
	},
);

order.virtual("jobInfo", {
	ref: JobModel,
	localField: "jobId",
	foreignField: "_id",
	justOne: true, // for many-to-1 relationships
});

order.virtual("employeeInfo", {
	ref: EmployeeModel,
	localField: "employeeId",
	foreignField: "_id",
	justOne: true, // for many-to-1 relationships
});

export default mongoose.model("order", order);