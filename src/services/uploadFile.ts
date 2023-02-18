import cloudinary from "cloudinary";
import { FileUpload } from "../interfaces/uploadFile.interface";
import IncomingForm from "formidable/Formidable";
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = process.env;
const cloud = cloudinary.v2;

cloud.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_SECRET,
});

const uploadImageToStorageService = async (folderName: string, fileName: string, image: any) => {
	try {
		const promise = () => {
			return new Promise((resolve: any, rejects: any) => {
				cloud.uploader.upload(
					image,
					{
						resource_type: "image",
						public_id: fileName,
						folder: folderName,
						format: "webp",
					},
					(error: any, result: any) => {
						if (error) {
							rejects(error);
						} else {
							resolve(result.secure_url);
						}
					},
				);
			});
		};
		const result: any = await promise();
		const a: FileUpload = { result, fileName };
		return a;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const uploadFileToStorageService = async (folderName: string, fileName: string, filepath: any, isGif = false) => {
	const resourceType = isGif ? "image" : "video";
	try {
		const promise = () => {
			return new Promise((resolve: any, rejects: any) => {
				cloud.uploader.upload_large(
					filepath,
					{
						resource_type: resourceType,
						public_id: fileName,
						folder: folderName,
						chunk_size: 6000000,
					},
					(error: any, result: any) => {
						if (error) {
							rejects(error);
						} else {
							resolve(result.secure_url);
						}
					},
				);
			});
		};
		const result: any = await promise();
		const a: FileUpload = { result, fileName };
		return a;
	} catch (error) {
		return error;
	}
};

const checkUploadService = (result: any, checkImage = false) => {
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

const handlePromiseUpload = (form: IncomingForm, req: any, filename: string) => {
	return new Promise((resolve: any, rejects: any) => {
		let fileURL;
		form.parse(req, async (error: any, fields: any, files: any) => {
			if (error) {
				rejects(error);
			} else {
				const msg = checkUploadService(files.file, true);
				if (msg) {
					rejects(msg);
				} else {
					const type = files.file.mimetype.split("/")[1];
					if (type === "gif" || type === "webp") {
						fileURL = await uploadFileToStorageService(filename, Date.now().toString(), files.file.filepath, true);
					} else {
						fileURL = await uploadImageToStorageService(filename, Date.now().toString(), files.file.filepath);
					}
					if (fileURL) {
						resolve(fileURL);
					} else {
						rejects(fileURL);
					}
				}
			}
		});
	});
};

export { handlePromiseUpload };
