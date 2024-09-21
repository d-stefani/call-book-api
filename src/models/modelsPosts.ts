import SSHDBConnection from './index';
import { Result, Login, Person, Visit, PersonSearch } from '../utils/types';

const executePostsQuery = async <T>(
  sqlStmt: string,
  values: any,
  errorMsg: string,
): Promise<T> => {
  const connection = await SSHDBConnection;

  try {
    const res = connection.promise().query({
      sql: sqlStmt,
      timeout: 5000,
      values: values,
    });
    const result: any = (await res) as any;
    console.log('Result:', result[0]);
    return result[0];
  } catch (error) {
    console.error(errorMsg, error);
    throw error;
  }
};

export const loginSql = async (data: Login): Promise<Login> => {
  console.log('DATA:', data);
  return await executePostsQuery<Login>(
    `SELECT id, name FROM users WHERE email = ? AND password = ?`,
    [data.email, data.password],
    'LOGIN SQL ERROR',
  );
};

export const insertPersonsSql = async (data: Person): Promise<number> => {
  console.log('DATA:', data);
  const result = await executePostsQuery<Result>(
    'INSERT INTO persons SET ?',
    data.data,
    'Error inserting person:',
  );
  console.log('RESULT: ', result.insertId);
  return result.insertId;
};

export const insertVisitSql = async (data: Visit): Promise<number> => {
  console.log('DATA:', data);
  const result = await executePostsQuery<Result>(
    'INSERT INTO visits SET ?',
    data.data,
    'Error inserting visit:',
  );
  return result.insertId;
};

export const searchPersonSql = async (
  data: PersonSearch,
): Promise<number | Person> => {
  const searchResult = await executePostsQuery<Person>(
    `SELECT * FROM persons
    WHERE name LIKE CONCAT('%', ?, '%') 
    OR address LIKE CONCAT('%', ?, '%')
    OR territory LIKE CONCAT('%', ?, '%')`,
    [data.search, data.search, data.search],
    'Error searching person:',
  );
  if (Object.keys(searchResult).length === 0) {
    return 0;
  }
  return searchResult;
};
