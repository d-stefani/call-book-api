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
exports.putVisit = exports.personActive = exports.person = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const services = __importStar(require("../services/services"));
aws_sdk_1.default.config.logger = console;
const handlePutRequest = (serviceFn, successMessage, failMessage, req, res) => {
    serviceFn(req.body)
        .then((affectedRows) => {
        res.status(affectedRows ? 200 : 400).json({
            error: !affectedRows,
            message: affectedRows ? successMessage : failMessage,
            data: {
                affected_rows: affectedRows || {},
            },
        });
    })
        .catch((error) => {
        console.error(`${failMessage}:`, error);
        res.status(500).json({
            error: true,
            message: 'Internal server error',
            data: {},
        });
    });
};
const person = (req, res) => handlePutRequest(services.putPersonSrv, 'Update Person success', 'Update Person Failed', req, res);
exports.person = person;
const personActive = (req, res) => handlePutRequest(services.putActivePersonSrv, 'Update Active success', 'Update Active Failed', req, res);
exports.personActive = personActive;
const putVisit = (req, res) => handlePutRequest(services.putVisitSrv, 'Update Visit success', 'Update Visit Failed', req, res);
exports.putVisit = putVisit;
//# sourceMappingURL=controllerPuts.js.map