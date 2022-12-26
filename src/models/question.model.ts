import mongoose from "mongoose";

const Schema = mongoose.Schema;

const question = new Schema(
	{
        name: { type: String, required: true, unique: true },
        detail: { type: Array },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("question", question);