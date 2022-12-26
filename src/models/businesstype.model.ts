import mongoose from "mongoose";

const Schema = mongoose.Schema;

const businessType = new Schema(
	{
		name: { type: String, required: true, unique: true },
		type: { type: String},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("businessType", businessType);
