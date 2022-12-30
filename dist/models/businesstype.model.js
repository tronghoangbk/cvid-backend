"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const businessType = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("businessType", businessType);
