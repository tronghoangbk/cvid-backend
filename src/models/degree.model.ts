import mongoose from "mongoose";

const Schema = mongoose.Schema;

const degreeLanguage = new Schema(
	{
		name: { type: String, required: true, unique: true },
        type: { type: String },
        language: { type: String },
        lis


	},
	{
		timestamps: true,
	},
);

export default mongoose.model("degreeLanguage", degreeLanguage);
