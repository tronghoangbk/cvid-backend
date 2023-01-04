import mongoose from "mongoose";

const Schema = mongoose.Schema;

const admin = new Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
        name: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("admin", admin);