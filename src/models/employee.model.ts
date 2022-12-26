import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employees = new Schema(
	{
		username: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		birthday: { type: Date },
		gender: { type: String },
		password: { type: String, required: true },
		ID: { type: String },
		email: { type: String, required: true, unique: true },
		avatar: { type: String, default: "default.png" },
		country: { type: String },
		province: { type: String },
		district: { type: String },
		ward: { type: String },
		address: { type: String },
		level: { type: String },
		school: { type: String },
		startYear: { type: Date },
		endYear: { type: Date },
		major: { type: String },
		jobTitle: { type: String },
		confirmPhone: { type: Boolean, default: false },
		confirmEmail: { type: Boolean, default: false },
		confirm1: {
			confirmed: { type: Number, default: 0 },
			confirmDate: { type: Date, default: Date.now },
			confirmBy: { type: Schema.Types.ObjectId },
			note: { type: String },
		},
		confirm2: {
			confirmed: { type: Boolean, default: false },
			confirmDate: { type: Date, default: Date.now },
			confirmBy: { type: Schema.Types.ObjectId },
			note: { type: String },
		},
		confirmIdentity: { type: Boolean, default: false },
		pointList: [{ type: Number, default: 0 }],
		points: { type: Number, default: 0 },
		skillLanguage: [{ type: Object }],
		skillOther: [{ type: Object }],
		skillWork: [{ type: Object }],
		skillEducation: [{ type: Object }],
		shortTraining: [{ type: Object }],
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("employee", employees);
