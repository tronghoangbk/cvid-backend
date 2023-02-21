"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const company_model_1 = __importDefault(require("./company.model"));
const Schema = mongoose_1.default.Schema;
const departments = new Schema({
    companyId: { type: Schema.Types.ObjectId, ref: company_model_1.default, required: true },
    departmentName: { type: String, required: true },
    key: { type: String, unique: true },
    managerName: { type: String },
    managerEmail: { type: String },
}, {
    timestamps: true,
});
departments.virtual("companyInfo", {
    ref: company_model_1.default,
    localField: "companyId",
    foreignField: "_id",
    justOne: true, // for many-to-1 relationships
});
exports.default = mongoose_1.default.model("department", departments);
