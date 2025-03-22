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
const mysql2_1 = __importDefault(require("mysql2"));
const ssh2_1 = require("ssh2");
const fs_1 = __importDefault(require("fs"));
require("dotenv/config");
const sshClient = new ssh2_1.Client();
const dbServer = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};
const sshTunnelConfig = {
    host: process.env.DB_SSH_HOST,
    port: 7822,
    username: process.env.DB_SSH_USER,
    privateKey: fs_1.default.readFileSync('config/id_rsa'),
};
const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 3306,
    dstHost: dbServer.host,
    dstPort: dbServer.port,
};
let pool = null;
const createPool = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        sshClient
            .on('ready', () => {
            sshClient.forwardOut(forwardConfig.srcHost, forwardConfig.srcPort, forwardConfig.dstHost, forwardConfig.dstPort, (err, stream) => {
                if (err) {
                    reject(err);
                    return;
                }
                const updatedDbServer = Object.assign(Object.assign({}, dbServer), { stream, waitForConnections: true, connectionLimit: 10, queueLimit: 0, enableKeepAlive: true, keepAliveInitialDelay: 0 });
                const newPool = mysql2_1.default.createPool(updatedDbServer);
                newPool.getConnection((error, connection) => {
                    if (error) {
                        console.error('Pool connection error:', error);
                        reject(error);
                        return;
                    }
                    connection.release();
                    console.log('Pool created successfully');
                    resolve(newPool);
                });
            });
        })
            .connect(sshTunnelConfig);
    });
});
const getPool = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!pool) {
        pool = yield createPool();
    }
    return pool;
});
exports.default = getPool;
//# sourceMappingURL=index.js.map