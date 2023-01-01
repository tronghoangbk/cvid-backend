"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const major = new Schema({
    level: { type: String, required: true, unique: true },
    majors: { type: (Array) },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("major", major);
