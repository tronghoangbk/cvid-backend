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
		avatar: { type: String, default: "https://static.thenounproject.com/png/5034901-200.png" },
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
			confirmed: { type: Number, default: 0 },
			confirmDate: { type: Date, default: Date.now },
			confirmBy: { type: Schema.Types.ObjectId },
			note: { type: String },
		},
		otp: { type: String },
		confirmIdentity: { type: Boolean, default: false },
		pointList: [{ type: Number, default: 0 }],
		points: { type: Number, default: 0 },
		skillLanguage: [{ type: Object }],
		skillOther: [{ type: Object }],
		skillWork: [
			{
				company: { type: String, required: true },
				start: { type: Date },
				end: { type: Date },
				address: { type: String },
				leaving: { type: String },
				process: { type: Array },
			},
		],
		skillEducation: [
			{
				level: { type: String, required: true },
				school: { type: String, required: true },
				start: { type: Date },
				end: { type: Date },
				major: { type: String, required: true },
				jobTitle: { type: String, required: true },
			},
		],
		shortTraining: [
			{
				certificate: { type: String, required: true },
				organizer: { type: String, required: true },
				start: { type: Date },
				end: { type: Date },
			},
		],
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("employee", employees);
