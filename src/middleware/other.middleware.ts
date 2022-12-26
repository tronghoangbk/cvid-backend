import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/other.service";

const checkInput = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.headers.authorization || !(req.headers.authorization.split(" ")[0] === "Basic")) {
			return res.status(401).json({ auth: false, message: "No token found." });
		} else {
			const token = req.headers.authorization.split(" ")[1];
			const decode = verifyToken(token);
			req.body.user = decode;
            console.log(decode);
			next();
		}
	} catch (err) {
		return res.status(401).json({ auth: false, message: "Failed to authenticate token." });
	}
};

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization || !(req.headers.authorization.split(" ")[0] === "Basic")) {
            return res.status(401).json({ auth: false, message: "No token found." });
        } else {
            const token = req.headers.authorization.split(" ")[1];
            const decode = verifyToken(token);
            if (decode.role !== "admin") {
                return res.status(401).json({ auth: false, message: "Failed to authenticate token." });
            }
            req.body.user = decode;
            console.log(decode);
            next();
        }
    } catch (err) {
        return res.status(401).json({ auth: false, message: "Failed to authenticate token." });
    }
};
export { checkInput, checkLogin, checkAdmin };
