"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_json_1 = __importDefault(require("../config/config.json"));
const serverless_mysql_1 = __importDefault(require("serverless-mysql"));
aws_sdk_1.default.config.logger = console;
const dbConf = config_json_1.default;
const mysql = (0, serverless_mysql_1.default)({
    backoff: 'decorrelated',
    base: 5,
    cap: 200,
});
mysql.config({
    host: dbConf.host,
    database: dbConf.database,
    user: dbConf.user,
    password: dbConf.password,
    multipleStatements: true,
});
exports.default = mysql;
//# sourceMappingURL=index.js.map