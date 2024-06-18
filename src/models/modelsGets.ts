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

export const listActivePersons = async (): Promise<Person> =>
  executeGetsQuery<Person>(`SELECT * 
  FROM persons 
  WHERE persons.active = 1
  ORDER BY dateTime ASC`);

export const getPerson = async (person_id: number): Promise<Person> =>
  executeGetsQuery<Person>(
    `SELECT *
    FROM persons 
    WHERE persons.id = ?`,
    [person_id],
  );

export const listPersonVisits = async (person_id: number): Promise<Visit> =>
  executeGetsQuery<Visit>(
    `SELECT *,
    DATE_FORMAT(visits.date, '%Y-%m-%d') AS visit_date 
    FROM visits WHERE person_id = ? ORDER BY date ASC`,
    [person_id],
  );
