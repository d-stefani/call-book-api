"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.putVisitSrv = exports.putActivePersonSrv = exports.putPersonSrv = exports.getVisitsSrv = exports.getPersonSrv = exports.getPersonsSrv = exports.postVisitSrv = exports.postSearchSrv = exports.postPersonSrv = exports.postLoginSrv = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const modelsPosts = __importStar(require("../models/modelsPosts"));
const modelsGets = __importStar(require("../models/modelsGets"));
const modelsPuts = __importStar(require("../models/modelsPuts"));
aws_sdk_1.default.config.logger = console;
const postLoginSrv = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield modelsPosts.loginSql(data);
});
exports.postLoginSrv = postLoginSrv;
const postPersonSrv = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield modelsPosts.insertPersonsSql(data);
    return data;
});
exports.postPersonSrv = postPersonSrv;
const postSearchSrv = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield modelsPosts.searchPersonSql(data);
});
exports.postSearchSrv = postSearchSrv;
const postVisitSrv = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield modelsPosts.insertVisitSql(data);
    return data;
});
exports.postVisitSrv = postVisitSrv;
const getPersonsSrv = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield modelsGets.listActivePersons();
});
exports.getPersonsSrv = getPersonsSrv;
const getPersonSrv = (person_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield modelsGets.getPerson(person_id);
});
exports.getPersonSrv = getPersonSrv;
const getVisitsSrv = (person_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield modelsGets.listPersonVisits(person_id);
});
exports.getVisitsSrv = getVisitsSrv;
const putPersonSrv = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield modelsPuts.updatePersonSql(data);
});
exports.putPersonSrv = putPersonSrv;
const putActivePersonSrv = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield modelsPuts.updateActivePersonSql(data);
});
exports.putActivePersonSrv = putActivePersonSrv;
const putVisitSrv = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield modelsPuts.updateVisitSql(data);
});
exports.putVisitSrv = putVisitSrv;
//# sourceMappingURL=services.js.map