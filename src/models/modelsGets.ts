import mysql from './index';
import { Person, Visit } from '../utils/types';

type ResultType = Person | Visit;

const executeGetsQuery = async <T extends ResultType>(
  sqlStmt: string,
  values?: any[],
): Promise<T> => {
  const res = await mysql
    .query({
      sql: sqlStmt,
      timeout: 5000,
      values: values,
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  await mysql.end();
  return res as T;
};

export const listActivePersons = async (): Promise<Person> =>
  executeGetsQuery<Person>(`SELECT *,
  DATE_FORMAT(persons.date, '%Y-%m-%d') AS call_date 
  FROM persons 
  WHERE persons.active = 1
  ORDER BY date ASC`);

export const listPersonVisits = async (person_id: number): Promise<Visit> =>
  executeGetsQuery<Visit>(
    `SELECT *,
    DATE_FORMAT(visits.date, '%Y-%m-%d') AS visit_date 
    FROM visits WHERE person_id = ? ORDER BY date ASC`,
    [person_id],
  );
