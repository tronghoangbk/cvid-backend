import mongoose from "mongoose";
import CompanyModel from "./admin.model";
import EmployeeModel from "./employee.model";



const Schema = mongoose.Schema;
const order = new Schema(
	{
        jobId: { type: Schema.Types.ObjectId },
        employeeId: { type: Schema.Types.ObjectId, ref: "employee" },
        sender: { type: String, enum: ["employee", "company"] },
        rating: { type: String, enum: ["A", "B", "C"] },
        comment: { type: String },
        status: { type: String, enum: ["pending", "confirmed", "rejected"], default: "pending" },
        interview: {
            date: { type: Date },
            time: { type: String },
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
	ref: CompanyModel,
	localField: "jobId",
	foreignField: "departments.jobs._id",
	justOne: true, // for many-to-1 relationships
});

order.virtual("employeeInfo", {
	ref: EmployeeModel,
	localField: "employeeId",
	foreignField: "_id",
	justOne: true, // for many-to-1 relationships
});

export default mongoose.model("order", order);