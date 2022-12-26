import mongoose from "mongoose";

const Schema = mongoose.Schema;

const companies = new Schema(
	{
		username: { type: String, required: true, unique: true },
		companyName: { type: String, required: true },
		companySize: { type: String },
		companyType: { type: String },
		country: { type: String },
		province: { type: String },
		district: { type: String },
		ward: { type: String },
		address: { type: String },
		phone: { type: String },
		email: { type: String, required: true, unique: true },
		avatar: { type: String, default: "default.png" },
		confirmPhone: { type: Boolean, default: false },
		confirmEmail: { type: Boolean, default: false },
		confirmIdentity: { type: Boolean, default: false },
		confirm1: {
			confirmed: { type: Number, default: 0 },
			confirmDate: { type: Date, default: Date.now },
			confirmBy: { type: Schema.Types.ObjectId },
			note: { type: String },
		},
		confirm2: {
			confirmed: { type: Number, default: 0 },
			confirmDate: { type: Date, default: Date.now },
			confirmBy: { type: Schema.Types.ObjectId },
			note: { type: String },
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("company", companies);
