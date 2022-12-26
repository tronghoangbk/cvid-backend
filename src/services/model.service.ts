import mongoose from "mongoose";
import { removeUndefinedOfObj } from "./other.service";

const createObjIdService = (id: string) => {
	const objId = new mongoose.Types.ObjectId(id);
	return objId;
};

const createService = async (model: any, newObject: object) => {
	try {
		const result = await new model(newObject);
		await result.save();
		return result;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const createManyService = async (model: any, newObjects: object[]) => {
	try {
		const result = await model.insertMany(newObjects);
		return result;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const findOneService = async (model: any, objQuery: object) => {
	try {
		objQuery = removeUndefinedOfObj(objQuery);
		const result = await model.findOne(objQuery);
		return result;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const findManyService = async (model: any, objQuery: object) => {
	try {
		objQuery = removeUndefinedOfObj(objQuery);
		const result = await model.find(objQuery);
		return result;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const updateOneService = async (model: any, objectQuery: object, objectUpdate: object) => {
	try {
		objectQuery = removeUndefinedOfObj(objectQuery);
		objectUpdate = removeUndefinedOfObj(objectUpdate);
		const result = await model.findOneAndUpdate(objectQuery, objectUpdate);
		return result;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const updateManyService = async (model: any, objectQuery: object, objectUpdate: object) => {
	try {
		objectQuery = removeUndefinedOfObj(objectQuery);
		objectUpdate = removeUndefinedOfObj(objectUpdate);
		const result = await model.updateMany(objectQuery, objectUpdate);
		return result;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const deleteOneService = async (model: any, objQuery: object) => {
	try {
		objQuery = removeUndefinedOfObj(objQuery);
		const result = await model.findOneAndDelete(objQuery);
		return result;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const deleteManyService = async (model: any, objQuery: object) => {
	try {
		objQuery = removeUndefinedOfObj(objQuery);
		const result = await model.deleteMany(objQuery);
		return result;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

export {
	createObjIdService,
	createService,
	createManyService,
	findOneService,
	findManyService,
	updateOneService,
	updateManyService,
	deleteOneService,
	deleteManyService,
};
