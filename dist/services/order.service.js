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
exports.checkOrderExistService = exports.getListOrderService = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const other_service_1 = require("./other.service");
const model_service_1 = require("./model.service");
const getListOrderService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    query = (0, other_service_1.removeUndefinedOfObj)(query);
    const orders = yield order_model_1.default.find(query).populate({ path: "employeeInfo" }).populate({ path: "jobInfo" }).lean();
    return orders;
});
exports.getListOrderService = getListOrderService;
const checkOrderExistService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    query = (0, other_service_1.removeUndefinedOfObj)(query);
    return yield (0, model_service_1.queryExistService)(order_model_1.default, query);
});
exports.checkOrderExistService = checkOrderExistService;
