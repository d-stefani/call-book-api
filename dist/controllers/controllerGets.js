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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisits = exports.getVisit = exports.getPerson = exports.getPersons = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const services = __importStar(require("../services/services"));
aws_sdk_1.default.config.logger = console;
const handleRequest = (serviceFn, successMessage, failMessage, req, res, reqParam) => {
    console.log('REQ PARAM:', reqParam, req.params);
    const param = reqParam ? parseInt(req.params[reqParam]) : undefined;
    serviceFn(param)
        .then((data) => {
        res.status(data ? 200 : 400).json({
            error: !data,
            message: data ? successMessage : failMessage,
            data: {
                getdata: data || {},
            },
        });
    })
        .catch((error) => {
        console.error(`Error ${failMessage}:`, error);
        res.status(500).json({
            error: true,
            message: 'Internal server error',
            data: {},
        });
    });
};
const getPersons = (req, res) => handleRequest(services.getPersonsSrv, 'Get Persons success', 'Get Persons failed', req, res, 'id');
exports.getPersons = getPersons;
const getPerson = (req, res) => handleRequest(services.getPersonSrv, 'Get Person success', 'Get Person failed', req, res, 'person_id');
exports.getPerson = getPerson;
const getVisit = (req, res) => handleRequest(services.getVisitSrv, 'Get Personvisit success', 'Get Person visit failed', req, res, 'visit_id');
exports.getVisit = getVisit;
const getVisits = (req, res) => handleRequest(services.getVisitsSrv, 'Get Persons visits success', 'Get Persons visits failed', req, res, 'person_id');
exports.getVisits = getVisits;
//# sourceMappingURL=controllerGets.js.map