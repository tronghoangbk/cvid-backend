import mongoose from "mongoose";
import { removeUndefinedOfObj } from "./other.service";

const createObjIdService = (id: string) => {
	const objId = new mongoose.Types.ObjectId(id);
	return objId;
};

const queryExistService = async (model: any, objectQuery: any): Promise<boolean> => {
	objectQuery = removeUndefinedOfObj(objectQuery);
	return await model.exists(objectQuery);
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

const findOneService = async (model: any, objQuery: object, properties: string = "", hintObj: any = { _id: 1 }) => {
	try {
		objQuery = removeUndefinedOfObj(objQuery);
		const result = await model.findOne(objQuery, properties).hint(hintObj);
		return result;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const findManyService = async (
	model: any,
	objQuery: object,
	properties: string = "",
	sortObj: object = { createdAt: -1 },
	limit: number = NaN,
	hintObj: any = { _id: 1 },
) => {
	try {
		objQuery = removeUndefinedOfObj(objQuery);
		const result = await model.find(objQuery, properties).sort(sortObj).limit(limit).hint(hintObj);
		return result;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const updateOneService = async (
	model: any,
	objectQuery: object,
	objectUpdate: object,
	option: object = { new: true, returnOriginal: false },
) => {
	try {
		objectQuery = removeUndefinedOfObj(objectQuery);
		objectUpdate = removeUndefinedOfObj(objectUpdate);
		const result = await model.findOneAndUpdate(objectQuery, objectUpdate, option);
		return result;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const updateManyService = async (
	model: any,
	objectQuery: object,
	objectUpdate: object,
	option: object = { new: true },
) => {
	try {
		objectQuery = removeUndefinedOfObj(objectQuery);
		objectUpdate = removeUndefinedOfObj(objectUpdate);
		const result = await model.updateMany(objectQuery, objectUpdate, option);
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

const countService = async (model: any, objQuery: object) => {
	try {
		objQuery = removeUndefinedOfObj(objQuery);
		const result = await model.countDocuments(objQuery);
		return result;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

export {
	queryExistService,
	createObjIdService,
	createService,
	createManyService,
	findOneService,
	findManyService,
	updateOneService,
	updateManyService,
	deleteOneService,
	deleteManyService,
	countService,
};
