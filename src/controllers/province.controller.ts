import { Request, Response } from "express";
import ProvinceModel from "../models/province.model";
import {
	createService,
	findOneService,
	findManyService,
	updateOneService,
	deleteOneService,
} from "../services/model.service";

const getAll = async (req: Request, res: Response) => {
	try {
		const positions = await findManyService(ProvinceModel, {});
		res.status(200).json({ data: positions, message: "Get all positions successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

const getListProvince = async (req: Request, res: Response) => {
    try {
        let provinces = await findManyService(ProvinceModel, {});
        provinces = provinces.map((item: any) => item.name);
        res.status(200).json({ data: provinces, message: "Get list provinces successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getListDistrict = async (req: Request, res: Response) => {
    try {
        const { province } = req.params;
        let districts = await findOneService(ProvinceModel, { name: province });
        districts = districts.district;
        districts = districts.map((item: any) => item.name);
        res.status(200).json({ data: districts, message: "Get list districts successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getListWard = async (req: Request, res: Response) => {
    try {
        const { province, district } = req.params;
        let provinces = await findOneService(ProvinceModel, { name: province });
        let districts = provinces.district;
        let wards = districts.find((item: any) => item.name === district);
        console.log(wards);
        wards = wards.ward;
        wards = wards.map((item: any) => item.name);
        res.status(200).json({ data: wards, message: "Get list wards successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
        
const createMany = async (req: Request, res: Response) => {
	try {
		const { data } = req.body;
		await Promise.all(
			data.map(async (item: any) => {
				await createService(ProvinceModel, item);
			}),
		);
		res.status(200).json({ message: "Create positions successfully" });
	} catch (error: any) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export { getAll, createMany, getListProvince, getListDistrict, getListWard };
