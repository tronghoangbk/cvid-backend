import mongoose from "mongoose";
import AdminModel from "./admin.model";
const Schema = mongoose.Schema;

const companies = new Schema(
	{
		username: { type: String, required: true, unique: true },
		companyName: { type: String, required: true },
		businessLicense: { type: String, required: true},
		companyType: { type: String },
		engName: { type: String },
		sortName: { type: String },
		mainIndustry: { type: String },
		original: { type: String },
		field: { type: Array },
		country: { type: String },
		address: { type: String },
		name: { type: String },
		phone: { type: String },
		email: { type: String, required: true, unique: true },
		position: { type: String },
		password: { type: String, required: true },
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

companies.virtual("adminConfirm1", {
	ref: AdminModel,
	localField: "confirm1.confirmBy",
	foreignField: "_id",
	justOne: true, // for many-to-1 relationships
});

companies.virtual("adminConfirm2", {
	ref: AdminModel,
	localField: "confirm2.confirmBy",
	foreignField: "_id",
	justOne: true, // for many-to-1 relationships
});

export default mongoose.model("company", companies);
