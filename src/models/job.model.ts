import mongoose from "mongoose";
import CompanyModel from "./admin.model";
import EmployeeModel from "./employee.model";



const Schema = mongoose.Schema;
const job = new Schema(
	{
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
	},
	{
		timestamps: true,
	},
);

job.virtual("jobInfo", {
	ref: CompanyModel,
	localField: "jobId",
	foreignField: "departments.jobs._id",
	justOne: true, // for many-to-1 relationships
});

job.virtual("employeeInfo", {
	ref: EmployeeModel,
	localField: "employeeId",
	foreignField: "_id",
	justOne: true, // for many-to-1 relationships
});

export default mongoose.model("job", job);