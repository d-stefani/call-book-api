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
exports.postVisits = exports.postPersons = exports.postLogin = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const services = __importStar(require("../services/services"));
aws_sdk_1.default.config.logger = console;
const handlePostRequest = (serviceFn, successMessage, failMessage, req, res, successDataKey) => {
    serviceFn(req.body)
        .then((data) => {
        res.status(data ? 200 : 400).json({
            error: !data,
            message: data ? successMessage : failMessage,
            data: {
                [successDataKey]: data || {},
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
const postLogin = (req, res) => handlePostRequest(services.postLoginSrv, 'Login success', 'User not found', req, res, 'data');
exports.postLogin = postLogin;
const postPersons = (req, res) => handlePostRequest(services.postPersonSrv, 'Add Person success', 'New Person insert failed', req, res, 'persons');
exports.postPersons = postPersons;
const postVisits = (req, res) => handlePostRequest(services.postVisitSrv, 'Add Visit success', 'New Visit insert failed', req, res, 'visits');
exports.postVisits = postVisits;
//# sourceMappingURL=controllerPosts.js.map