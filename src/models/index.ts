import mysql, { Pool, PoolOptions } from 'mysql2';
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

let pool: Pool | null = null;

const createPool = async (): Promise<Pool> => {
  return new Promise((resolve, reject) => {
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
            const updatedDbServer: PoolOptions = {
              ...dbServer,
              stream,
              waitForConnections: true,
              connectionLimit: 10,
              queueLimit: 0,
              enableKeepAlive: true,
              keepAliveInitialDelay: 0,
            };
            const newPool = mysql.createPool(updatedDbServer);
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
          },
        );
      })
      .connect(sshTunnelConfig);
  });
};

const getPool = async (): Promise<Pool> => {
  if (!pool) {
    pool = await createPool();
  }
  return pool;
};

export default getPool;
