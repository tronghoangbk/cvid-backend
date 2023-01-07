"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = exports.checkLogin = exports.checkInput = void 0;
const express_validator_1 = require("express-validator");
const other_service_1 = require("../services/other.service");
const checkInput = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.checkInput = checkInput;
const checkLogin = (req, res, next) => {
    try {
        if (!req.headers.authorization || !(req.headers.authorization.split(" ")[0] === "Basic")) {
            return res.status(401).json({ auth: false, message: "No token found." });
        }
        else {
            const token = req.headers.authorization.split(" ")[1];
            const decode = (0, other_service_1.verifyToken)(token);
            req.body.user = decode;
            console.log('you are logged in');
            next();
        }
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ auth: false, message: "Failed to authenticate token." });
    }
};
exports.checkLogin = checkLogin;
const checkAdmin = (req, res, next) => {
    try {
        if (!req.headers.authorization || !(req.headers.authorization.split(" ")[0] === "Basic")) {
            return res.status(401).json({ auth: false, message: "No token found." });
        }
        else {
            const token = req.headers.authorization.split(" ")[1];
            const decode = (0, other_service_1.verifyToken)(token);
            if (decode.role !== "admin") {
                return res.status(401).json({ auth: false, message: "Failed to authenticate token." });
            }
            req.body.user = decode;
            next();
        }
    }
    catch (err) {
        return res.status(401).json({ auth: false, message: "Failed to authenticate token." });
    }
};
exports.checkAdmin = checkAdmin;
