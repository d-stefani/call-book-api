import mysql, { Connection, ConnectionOptions } from 'mysql2';
import { Client } from 'ssh2';
import fs from 'fs';
import 'dotenv/config';

const sshClient = new Client();

interface DbServerConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

interface SshTunnelConfig {
  host: string | undefined;
  port: number;
  username: string;
  privateKey: Buffer;
}

const dbServer: DbServerConfig = {
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string, 10),
  user: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE as string,
};

const sshTunnelConfig: SshTunnelConfig = {
  host: process.env.DB_SSH_HOST,
  port: 7822,
  username: process.env.DB_SSH_USER as string,
  privateKey: fs.readFileSync('config/id_rsa'),
};

const forwardConfig = {
  srcHost: '127.0.0.1',
  srcPort: 3306,
  dstHost: dbServer.host,
  dstPort: dbServer.port,
};

const SSHDBConnection: Promise<Connection> = new Promise((resolve, reject) => {
  sshClient
    .on('ready', () => {
      sshClient.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        (err, stream) => {
          if (err) {
            reject(err);
            return;
          }
          const updatedDbServer: ConnectionOptions = {
            ...dbServer,
            stream,
          };
          const connection = mysql.createConnection(updatedDbServer);
          connection.connect((error) => {
            if (error) {
              console.error('error---', error);
              reject(error);
              return;
            }
            console.log('Connection Successful');
            resolve(connection);
          });
        },
      );
    })
    .connect(sshTunnelConfig);
});

export default SSHDBConnection;
