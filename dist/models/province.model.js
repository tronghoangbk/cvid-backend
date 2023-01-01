"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const province = new Schema({
    code: { required: true, type: String, unique: true },
    name: { required: true, type: String, unique: true },
    district: (Array),
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("province", province);
