import AWS from 'aws-sdk';
import { DbConf } from '@/utils/types';
import dbConfiguration from '../config/config.json';
import serverlessMysql, { ServerlessMysql } from 'serverless-mysql';

AWS.config.logger = console;

const dbConf: DbConf = dbConfiguration;

const mysql: ServerlessMysql = serverlessMysql({
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

export default mysql;
