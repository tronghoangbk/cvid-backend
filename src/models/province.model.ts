import mongoose from "mongoose";

const Schema = mongoose.Schema;

const province = new Schema(
	{
        code: {required: true, type: String, unique: true},
        name: {required: true, type: String, unique: true},
        district: Array<{
            pre: String, 
            name: String, 
            ward: Array<{
                pre: string, 
                name: string
            }>
        }>,
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("province", province);