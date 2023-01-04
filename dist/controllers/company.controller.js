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
exports.getInfoCompanyFromUri = exports.updateCompany = exports.getCompanyById = exports.getAllCompany = exports.verified = exports.verifyEmail = exports.register = exports.login = void 0;
const dom_parser_1 = __importDefault(require("dom-parser"));
const company_model_1 = __importDefault(require("../models/company.model"));
const model_service_1 = require("../services/model.service");
const mail_service_1 = require("../services/mail.service");
const errorResponse_constant_1 = require("../constant/errorResponse.constant");
const fs_1 = __importDefault(require("fs"));
const default_constant_1 = require("../constant/default.constant");
const other_service_1 = require("../services/other.service");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield (0, model_service_1.findOneService)(company_model_1.default, { username: username });
        if (!user)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        const isPasswordCorrect = (0, other_service_1.comparePassword)(password, user.password);
        if (!isPasswordCorrect)
            return res.status(401).json({ message: errorResponse_constant_1.errorResponse["INVALID_PASSWORD"] });
        if (!user.confirmEmail)
            return res.status(403).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_CONFIRMED"] });
        const idToken = (0, other_service_1.generateToken)({ id: user._id, username: user.username }, "1d");
        res.status(200).json(Object.assign(Object.assign({}, user._doc), { idToken, expiresIn: "3600" }));
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        let userInfo = yield (0, model_service_1.findOneService)(company_model_1.default, { username: newUser.username });
        if (userInfo)
            return res.status(400).json({ message: errorResponse_constant_1.errorResponse["TAXCODE_EXISTS"] });
        userInfo = yield (0, model_service_1.findOneService)(company_model_1.default, { email: newUser.email });
        if (userInfo)
            return res.status(400).json({ message: errorResponse_constant_1.errorResponse["EMAIL_EXISTS"] });
        userInfo = yield (0, model_service_1.findOneService)(company_model_1.default, { phone: newUser.phone });
        if (userInfo)
            return res.status(400).json({ message: errorResponse_constant_1.errorResponse["PHONE_EXISTS"] });
        newUser.password = (0, other_service_1.hashPassword)(newUser.password);
        const user = yield (0, model_service_1.createService)(company_model_1.default, newUser);
        // Send email
        const subject = "Đăng ký thành công";
        let html = fs_1.default.readFileSync(`${default_constant_1.staticFolder}views/mailConfirm.html`, { encoding: "utf8" });
        let link = `${req.headers.host}/company/verify-email/${user._id}`;
        html = html.replace("{{link}}", link);
        yield (0, mail_service_1.sendEmail)(user.email, subject, html);
        res.status(200).json({ message: "Register successfully" });
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.register = register;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // const user = await findOneService(CompanyModal, { _id: id });
        // if (!user) return res.status(404).json({ message: errorResponse["USER_NOT_FOUND"] });
        // if (user.confirmEmail) return res.status(400).json({ message: errorResponse["USER_CONFIRMED"] });
        yield (0, model_service_1.updateOneService)(company_model_1.default, { _id: id }, { confirmEmail: true });
        let message = "Xác thực email thành công";
        res.redirect(`/company/verified?message=${message}`);
    }
    catch (error) {
        let message = "Xác thực email thất bại";
        res.redirect(`/company/verified?error=true&message=${message}`);
    }
});
exports.verifyEmail = verifyEmail;
const verified = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.sendFile(`${default_constant_1.staticFolder}views/verified.html`);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.verified = verified;
const getAllCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, model_service_1.findManyService)(company_model_1.default, {});
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.getAllCompany = getAllCompany;
const getCompanyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, model_service_1.findOneService)(company_model_1.default, { _id: id });
        if (!user)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.getCompanyById = getCompanyById;
const updateCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, model_service_1.findOneService)(company_model_1.default, { _id: id });
        if (!user)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        const updatedUser = req.body;
        if (updatedUser.password)
            updatedUser.password = (0, other_service_1.hashPassword)(updatedUser.password);
        const newUser = yield (0, model_service_1.updateOneService)(company_model_1.default, { _id: id }, updatedUser);
        res.status(200).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.updateCompany = updateCompany;
const getInfoCompanyFromUri = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    try {
        const { id } = req.params;
        let url = `https://masothue.com/Search/?q=${id}&type=auto`;
        let htmlStr = yield (0, other_service_1.getDataFromURL)(url);
        const parser = new dom_parser_1.default();
        const document = parser.parseFromString(htmlStr);
        let result = document.getElementsByClassName("copy");
        if (!result.length)
            return res.status(404).json({ message: errorResponse_constant_1.errorResponse["USER_NOT_FOUND"] });
        let CompanyInfo = result.length === 8
            ? {
                name: (_a = result[0]) === null || _a === void 0 ? void 0 : _a.textContent,
                engName: (_b = result[1]) === null || _b === void 0 ? void 0 : _b.textContent,
                sortName: (_c = result[2]) === null || _c === void 0 ? void 0 : _c.textContent,
                taxCode: (_d = result[3]) === null || _d === void 0 ? void 0 : _d.textContent,
                address: (_e = result[4]) === null || _e === void 0 ? void 0 : _e.textContent,
                phone: (_f = result[5]) === null || _f === void 0 ? void 0 : _f.textContent,
                opening: (_g = result[6]) === null || _g === void 0 ? void 0 : _g.textContent,
                original: (_h = result[7]) === null || _h === void 0 ? void 0 : _h.textContent,
            }
            : {
                name: (_j = result[0]) === null || _j === void 0 ? void 0 : _j.textContent,
                taxCode: (_k = result[1]) === null || _k === void 0 ? void 0 : _k.textContent,
                address: (_l = result[2]) === null || _l === void 0 ? void 0 : _l.textContent,
                phone: (_m = result[3]) === null || _m === void 0 ? void 0 : _m.textContent,
                opening: (_o = result[4]) === null || _o === void 0 ? void 0 : _o.textContent,
                original: (_p = result[5]) === null || _p === void 0 ? void 0 : _p.textContent,
            };
        res.status(200).json(CompanyInfo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: errorResponse_constant_1.errorResponse["SERVER_ERROR"] });
    }
});
exports.getInfoCompanyFromUri = getInfoCompanyFromUri;
