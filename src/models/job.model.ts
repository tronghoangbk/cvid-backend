import mongoose from "mongoose";
import departmentModel from "./department.model";
import companyModel from "./company.model";
import adminModel from "./admin.model";
const Schema = mongoose.Schema;

const Job = new Schema(
	{
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
	},
	{
		timestamps: true,
	},
);

Job.virtual("departmentInfo", {
	ref: departmentModel,
	localField: "departmentId",
	foreignField: "_id",
	justOne: true, // for many-to-1 relationships
});

Job.virtual("companyInfo", {
    ref: companyModel,
    localField: "companyId",
    foreignField: "_id",
    justOne: true, // for many-to-1 relationships
});

Job.virtual("adminConfirm1", {
	ref: adminModel,
	localField: "confirm1.confirmBy",
	foreignField: "_id",
	justOne: true, // for many-to-1 relationships
});

Job.virtual("adminConfirm2", {
	ref: adminModel,
	localField: "confirm2.confirmBy",
	foreignField: "_id",
	justOne: true, // for many-to-1 relationships
});

export default mongoose.model("job", Job);
