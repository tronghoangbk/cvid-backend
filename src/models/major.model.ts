import mongoose from "mongoose";

const Schema = mongoose.Schema;

const major = new Schema(
	{
        level: { type: String, required: true, unique: true },
        majors: { type: Array<String> },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("major", major);