import mongoose from "mongoose";
import companyModel from "./company.model";
const Schema = mongoose.Schema;

const departments = new Schema(
	{
		companyId: { type: Schema.Types.ObjectId, ref: companyModel },
		departmentName: { type: String, required: true },
		key: { type: String, unique: true },
		managerName: { type: String },
		managerEmail: { type: String },
	},
	{
		timestamps: true,
	},
);

departments.virtual("companyInfo", {
	ref: companyModel,
	localField: "companyId",
	foreignField: "_id",
	justOne: true, // for many-to-1 relationships
});

export default mongoose.model("department", departments);
