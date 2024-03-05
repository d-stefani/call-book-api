import mysql from './index';
import { Result, Login, Person, Visit, PersonSearch } from '../utils/types';

const executePostsQuery = async <T>(
  sql: string,
  values: any,
  errorMsg: string,
): Promise<T> => {
  try {
    const res = await mysql.query({ sql, timeout: 5000, values });
    const result: T = res as T;
    return result;
    console.log('result', result);
  } catch (error) {
    console.error(errorMsg, error);
    throw error;
  } finally {
    mysql.end();
  }
};

export const loginSql = async (data: Login): Promise<Login> => {
  return await executePostsQuery<Login>(
    `SELECT id, name FROM users WHERE email = ? AND password = ?`,
    [data.email, data.password],
    'LOGIN SQL ERROR',
  );
};

export const insertPersonsSql = async (data: Person): Promise<number> => {
  const result = await executePostsQuery<Result>(
    'INSERT INTO persons SET ?',
    data,
    'Error inserting person:',
  );
  return result.insertId;
};

export const insertVisitSql = async (data: Visit): Promise<number> => {
  const result = await executePostsQuery<Result>(
    'INSERT INTO visits SET ?',
    data,
    'Error inserting visit:',
  );
  return result.insertId;
};

export const searchPersonSql = async (
  data: PersonSearch,
): Promise<boolean | Person> => {
  const searchResult = await executePostsQuery<Person>(
    `SELECT *, DATE_FORMAT(persons.date, '%Y-%m-%d') AS call_date FROM persons 
    WHERE name LIKE CONCAT('%', ?, '%') 
    OR address LIKE CONCAT('%', ?, '%')
    OR territory LIKE CONCAT('%', ?, '%')`,
    [data.search, data.search, data.search],
    'Error searching person:',
  );
  if (Object.keys(searchResult).length === 0) {
    return false;
  }
  return searchResult;
};
