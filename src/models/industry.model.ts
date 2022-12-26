import mongoose from "mongoose";

const Schema = mongoose.Schema;

const industry = new Schema(
	{
        name: { type: String, required: true, unique: true },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("industry", industry);