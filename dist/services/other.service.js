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
exports.checkOTP = exports.verifyToken = exports.generateToken = exports.hashPassword = exports.comparePassword = exports.postDataFromURL = exports.getDataFromURL = exports.removeUndefinedOfObj = void 0;
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SECRET_KEY = process.env.SECRET_KEY || "secretKey";
const removeUndefinedOfObj = (obj) => {
    Object.keys(obj).forEach(key => (obj[key] === undefined ? delete obj[key] : {}));
    return obj;
};
exports.removeUndefinedOfObj = removeUndefinedOfObj;
const getDataFromURL = (url, headers = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield axios_1.default.get(url, headers);
        let data = response.data;
        return data;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
});
exports.getDataFromURL = getDataFromURL;
const postDataFromURL = (url, body = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield axios_1.default.post(url, body);
        let data = response.data;
        return data;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
});
exports.postDataFromURL = postDataFromURL;
const comparePassword = (password, hashPassword) => {
    try {
        return bcryptjs_1.default.compareSync(password, hashPassword);
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
};
exports.comparePassword = comparePassword;
const hashPassword = (password) => {
    try {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(password, salt);
        return hash;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
};
exports.hashPassword = hashPassword;
const generateToken = (payload, expires) => {
    try {
        const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: expires });
        return token;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        return decoded;
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.verifyToken = verifyToken;
const checkOTP = (otp, otpHash) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(otpHash, SECRET_KEY);
        if (decoded.otp === otp && decoded.exp > Date.now()) {
            return true;
        }
        return false;
    }
    catch (error) {
        throw error;
    }
};
exports.checkOTP = checkOTP;
