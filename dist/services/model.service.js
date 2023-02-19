"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countService = exports.deleteManyService = exports.deleteOneService = exports.updateManyService = exports.updateOneService = exports.findManyService = exports.findOneService = exports.createManyService = exports.createService = exports.createObjIdService = exports.queryExistService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const other_service_1 = require("./other.service");
const createObjIdService = (id) => {
    const objId = new mongoose_1.default.Types.ObjectId(id);
    return objId;
};
exports.createObjIdService = createObjIdService;
const queryExistService = (model, objectQuery) => __awaiter(void 0, void 0, void 0, function* () {
    objectQuery = (0, other_service_1.removeUndefinedOfObj)(objectQuery);
    return yield model.exists(objectQuery);
});
exports.queryExistService = queryExistService;
const createService = (model, newObject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield new model(newObject);
        yield result.save();
        return result;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
});
exports.createService = createService;
const createManyService = (model, newObjects) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model.insertMany(newObjects);
        return result;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
});
exports.createManyService = createManyService;
const findOneService = (model, objQuery, properties = "", hintObj = { _id: 1 }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        objQuery = (0, other_service_1.removeUndefinedOfObj)(objQuery);
        const result = yield model.findOne(objQuery, properties).hint(hintObj);
        return result;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
});
exports.findOneService = findOneService;
const findManyService = (model, objQuery, properties = "", sortObj = { createdAt: -1 }, limit = NaN, hintObj = { _id: 1 }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        objQuery = (0, other_service_1.removeUndefinedOfObj)(objQuery);
        const result = yield model.find(objQuery, properties).sort(sortObj).limit(limit).hint(hintObj);
        return result;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
});
exports.findManyService = findManyService;
const updateOneService = (model, objectQuery, objectUpdate, option = { new: true, returnOriginal: false }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        objectQuery = (0, other_service_1.removeUndefinedOfObj)(objectQuery);
        objectUpdate = (0, other_service_1.removeUndefinedOfObj)(objectUpdate);
        const result = yield model.findOneAndUpdate(objectQuery, objectUpdate, option);
        return result;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
});
exports.updateOneService = updateOneService;
const updateManyService = (model, objectQuery, objectUpdate, option = { new: true }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        objectQuery = (0, other_service_1.removeUndefinedOfObj)(objectQuery);
        objectUpdate = (0, other_service_1.removeUndefinedOfObj)(objectUpdate);
        const result = yield model.updateMany(objectQuery, objectUpdate, option);
        return result;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
});
exports.updateManyService = updateManyService;
const deleteOneService = (model, objQuery) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        objQuery = (0, other_service_1.removeUndefinedOfObj)(objQuery);
        const result = yield model.findOneAndDelete(objQuery);
        return result;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
});
exports.deleteOneService = deleteOneService;
const deleteManyService = (model, objQuery) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        objQuery = (0, other_service_1.removeUndefinedOfObj)(objQuery);
        const result = yield model.deleteMany(objQuery);
        return result;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
});
exports.deleteManyService = deleteManyService;
const countService = (model, objQuery) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        objQuery = (0, other_service_1.removeUndefinedOfObj)(objQuery);
        const result = yield model.countDocuments(objQuery);
        return result;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
});
exports.countService = countService;
