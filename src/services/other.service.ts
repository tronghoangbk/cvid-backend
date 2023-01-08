import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY: string = process.env.SECRET_KEY || "secretKey";

const removeUndefinedOfObj = (obj: any) => {
	Object.keys(obj).forEach(key => (obj[key] === undefined ? delete obj[key] : {}));
	return obj;
};

const getDataFromURL = async (url: string, headers: any = undefined) => {
	try {
		let response = await axios.get(url, headers);
		let data = response.data;
		return data;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const postDataFromURL = async (url: string, body: any = undefined) => {
	try {
		let response = await axios.post(url, body);
		let data = response.data;
		return data;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const comparePassword = (password: string, hashPassword: string) => {
	try {
		return bcrypt.compareSync(password, hashPassword);
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const hashPassword = (password: string) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		return hash;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const generateToken = (payload: any, expires: string) => {
	try {
		const token = jwt.sign(payload, SECRET_KEY, { expiresIn: expires });
		return token;
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
};

const verifyToken = (token: string): any => {
	try {
		const decoded: any = jwt.verify(token, SECRET_KEY);
		return decoded;
	} catch (error: any) {
		console.log(error.message);
	}
};

const checkOTP = (otp: string, otpHash: string) => {
	try {
		const decoded: any = jwt.verify(otpHash, SECRET_KEY);
		if (decoded.otp === otp && decoded.exp > Date.now()) {
			return true;
		}
		return false;
	} catch (error: any) {
		throw error;
	}
};


export { removeUndefinedOfObj, getDataFromURL, postDataFromURL, comparePassword, hashPassword, generateToken, verifyToken, checkOTP };
