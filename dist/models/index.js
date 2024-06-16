"use strict";
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
const SSHDBConnection = new Promise((resolve, reject) => {
    sshClient
        .on('ready', () => {
        sshClient.forwardOut(forwardConfig.srcHost, forwardConfig.srcPort, forwardConfig.dstHost, forwardConfig.dstPort, (err, stream) => {
            if (err) {
                reject(err);
                return;
            }
            const updatedDbServer = Object.assign(Object.assign({}, dbServer), { stream });
            const connection = mysql2_1.default.createConnection(updatedDbServer);
            connection.connect((error) => {
                if (error) {
                    console.error('error---', error);
                    reject(error);
                    return;
                }
                console.log('Connection Successful');
                resolve(connection);
            });
        });
    })
        .connect(sshTunnelConfig);
});
exports.default = SSHDBConnection;
//# sourceMappingURL=index.js.map