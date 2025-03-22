import getPool from './index';
import { Result, Login, Person, Visit, PersonSearch } from '../utils/types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const executePostsQuery = async <T extends RowDataPacket | ResultSetHeader>(
  sqlStmt: string,
  values: any,
  errorMsg: string,
): Promise<T[]> => {
  const pool = await getPool();

  try {
    const [result] = await pool.promise().query({
      sql: sqlStmt,
      timeout: 5000,
      values: values,
    });

    if (!result || (Array.isArray(result) && result.length === 0)) {
      throw new Error(errorMsg);
    }
    return result as T[];
  } catch (error) {
    console.error(errorMsg, error);
    throw error;
  }
};

export const loginSql = async (data: Login): Promise<Login> => {
  const result = await executePostsQuery<Login>(
    `SELECT id, name, email FROM users WHERE email = ? AND password = ?`,
    [data.email, data.password],
    'LOGIN SQL ERROR',
  );
  return result[0];
};

export const insertPersonsSql = async (data: Person): Promise<number> => {
  const result = await executePostsQuery<Result>(
    'INSERT INTO persons SET ?',
    data.data,
    'Error inserting person:',
  );
  return result[0].insertId;
};

export const insertVisitSql = async (data: Visit): Promise<number> => {
  const result = await executePostsQuery<Result>(
    'INSERT INTO visits SET ?',
    data.data,
    'Error inserting visit:',
  );
  return result[0].insertId;
};

export const searchPersonSql = async (
  data: PersonSearch,
): Promise<number | Person> => {
  const searchResult = await executePostsQuery<Person>(
    `SELECT DISTINCT id, name, address, phone, email, territory, environment, notes, active, dateTime
    FROM persons
    WHERE name LIKE ?
    OR address LIKE ?
    OR territory LIKE ?
    LIMIT 50`,
    [`%${data.search}%`, `%${data.search}%`, `%${data.search}%`],
    'Error searching person:',
  );
  
  if (!searchResult || searchResult.length === 0) {
    return 0;
  }
  return searchResult[0];
};
