import SSHDBConnection from './index';
import { Person, Visit, Data, Result } from '../utils/types';

type ResultType = Person | Visit | Data | Result;

const executeGetsQuery = async <T>(
  sqlStmt: string,
  values?: any[],
): Promise<T> => {
  const connection = await SSHDBConnection;
  try {
    const res = connection.promise().query(sqlStmt, values);
    const result: any = (await res) as any;
    console.log('Result:', result[0]);
    return result[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const listActivePersons = async (id: number): Promise<Person> =>
  executeGetsQuery<Person>(
    `SELECT * 
    FROM persons 
    WHERE persons.user_id = ?
    AND persons.active = 1
    ORDER BY dateTime ASC`,
  [id],
);

export const getPerson = async (person_id: number): Promise<Person> =>
  executeGetsQuery<Person>(
    `SELECT *
    FROM persons 
    WHERE persons.id = ?`,
    [person_id],
  );

export const listPersonVisits = async (person_id: number): Promise<Visit> =>
  executeGetsQuery<Visit>(
    `SELECT *
    FROM visits WHERE person_id = ? ORDER BY dateTime DESC`,
    [person_id],
  );

export const getVisitSql = async (visit_id: number): Promise<Visit> =>
  executeGetsQuery<Visit>(
    `SELECT *
      FROM visits WHERE id = ? ORDER BY dateTime ASC`,
    [visit_id],
  );
