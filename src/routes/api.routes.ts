import express from "express";
import employeeRouter from "./employee.routes";
import schoolRouter from "./school.routes";
import questionRouter from "./question.routes";
import companyType from "./companytype.routes";
import environmentRouter from "./environment.routes";
import majorRouter from "./major.routes";
import companyRouter from "./company.routes";
import industryRouter from "./industry.routes";
import jobTitleRouter from "./jobtitle.routes";
import positionRouter from "./position.routes";
import provinceRouter from "./province.routes";

const APIRouter = express.Router();

//APIRouter.use("/static", express.static(path.join(__dirname, "../../public")));

APIRouter.use("/employee", employeeRouter);
APIRouter.use("/school", schoolRouter);
APIRouter.use("/question", questionRouter);
APIRouter.use("/company-type", companyType);
APIRouter.use("/position", positionRouter);
APIRouter.use("/environment", environmentRouter);
APIRouter.use("/major", majorRouter);
APIRouter.use("/company", companyRouter);
APIRouter.use("/industry", industryRouter);
APIRouter.use("/job-title", jobTitleRouter);
APIRouter.use("/province", provinceRouter);

export default APIRouter;
