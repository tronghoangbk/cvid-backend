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
exports.handlePromiseUpload = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = process.env;
const cloud = cloudinary_1.default.v2;
cloud.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET,
});
const uploadImageToStorageService = (folderName, fileName, image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promise = () => {
            return new Promise((resolve, rejects) => {
                cloud.uploader.upload(image, {
                    resource_type: "image",
                    public_id: fileName,
                    folder: folderName,
                    format: "webp",
                }, (error, result) => {
                    if (error) {
                        rejects(error);
                    }
                    else {
                        resolve(result.secure_url);
                    }
                });
            });
        };
        const result = yield promise();
        const a = { result, fileName };
        return a;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
const uploadFileToStorageService = (folderName, fileName, filepath, isGif = false) => __awaiter(void 0, void 0, void 0, function* () {
    const resourceType = isGif ? "image" : "video";
    try {
        const promise = () => {
            return new Promise((resolve, rejects) => {
                cloud.uploader.upload_large(filepath, {
                    resource_type: resourceType,
                    public_id: fileName,
                    folder: folderName,
                    chunk_size: 6000000,
                }, (error, result) => {
                    if (error) {
                        rejects(error);
                    }
                    else {
                        resolve(result.secure_url);
                    }
                });
            });
        };
        const result = yield promise();
        const a = { result, fileName };
        return a;
    }
    catch (error) {
        return error;
    }
});
const checkUploadService = (result, checkImage = false) => {
    if (!result) {
        return "Upload failed";
    }
    if (checkImage) {
        if (result.mimetype.split("/")[1] !== "gif" || result.mimetype.split("/")[1] !== "webp") {
            if (result.mimetype.split("/")[0] !== "image") {
                return "Image upload only";
            }
        }
    }
    return "";
};
const handlePromiseUpload = (form, req, filename) => {
    return new Promise((resolve, rejects) => {
        let fileURL;
        form.parse(req, (error, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                rejects(error);
            }
            else {
                const msg = checkUploadService(files.file, true);
                if (msg) {
                    rejects(msg);
                }
                else {
                    const type = files.file.mimetype.split("/")[1];
                    if (type === "gif" || type === "webp") {
                        fileURL = yield uploadFileToStorageService(filename, Date.now().toString(), files.file.filepath, true);
                    }
                    else {
                        fileURL = yield uploadImageToStorageService(filename, Date.now().toString(), files.file.filepath);
                    }
                    if (fileURL) {
                        resolve(fileURL);
                    }
                    else {
                        rejects(fileURL);
                    }
                }
            }
        }));
    });
};
exports.handlePromiseUpload = handlePromiseUpload;
