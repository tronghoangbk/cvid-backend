import mongoose from "mongoose";

const Schema = mongoose.Schema;

const companyType = new Schema(
	{
		name: { type: String, required: true, unique: true },
		type: { type: String },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("companyType", companyType);
