"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const employee_routes_1 = __importDefault(require("./employee.routes"));
const school_routes_1 = __importDefault(require("./school.routes"));
const question_routes_1 = __importDefault(require("./question.routes"));
const companytype_routes_1 = __importDefault(require("./companytype.routes"));
const environment_routes_1 = __importDefault(require("./environment.routes"));
const major_routes_1 = __importDefault(require("./major.routes"));
const company_routes_1 = __importDefault(require("./company.routes"));
const industry_routes_1 = __importDefault(require("./industry.routes"));
const jobtitle_routes_1 = __importDefault(require("./jobtitle.routes"));
const position_routes_1 = __importDefault(require("./position.routes"));
const province_routes_1 = __importDefault(require("./province.routes"));
const order_routes_1 = __importDefault(require("./order.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const department_routes_1 = __importDefault(require("./department.routes"));
const job_routes_1 = __importDefault(require("./job.routes"));
const APIRouter = express_1.default.Router();
APIRouter.use("/static", express_1.default.static(path_1.default.join(__dirname, "../../public")));
APIRouter.use("/employee", employee_routes_1.default);
APIRouter.use("/school", school_routes_1.default);
APIRouter.use("/question", question_routes_1.default);
APIRouter.use("/company-type", companytype_routes_1.default);
APIRouter.use("/position", position_routes_1.default);
APIRouter.use("/environment", environment_routes_1.default);
APIRouter.use("/major", major_routes_1.default);
APIRouter.use("/company", company_routes_1.default);
APIRouter.use("/industry", industry_routes_1.default);
APIRouter.use("/job-title", jobtitle_routes_1.default);
APIRouter.use("/order", order_routes_1.default);
APIRouter.use("/province", province_routes_1.default);
APIRouter.use("/admin", admin_routes_1.default);
APIRouter.use("/department", department_routes_1.default);
APIRouter.use("/job", job_routes_1.default);
exports.default = APIRouter;
