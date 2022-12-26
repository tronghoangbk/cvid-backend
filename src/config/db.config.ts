const { USERNAME_DB, PASSWORD_DB, NAME_DB } = process.env;

import mongoose from "mongoose";
const connectDB = async () => {
	try {
		const promise = async () => {
			return new Promise((resolve: any, rejects: any) => {
				mongoose.connect(
					`mongodb+srv://${USERNAME_DB}:${PASSWORD_DB}@cluster0.gznnk.mongodb.net/${NAME_DB}?retryWrites=true&w=majority`,
					error => {
						if (error) {
							rejects(error);
						} else {
							resolve("Connect successfully to database!");
						}
					},
				);
			});
		};
		const resolve = await promise();
		console.log(resolve);
	} catch (error: any) {
		console.log(error.message);
	}
};

export { connectDB };
