import getPool from './index';
import { Person, Visit, Data, Result } from '../utils/types';

type ResultType = Person | Visit | Data | Result;

const executeGetsQuery = async <T>(
  sqlStmt: string,
  values?: any[],
): Promise<T> => {
  const pool = await getPool();
  try {
    const [result] = await pool.promise().query(sqlStmt, values);
    return result as T;
  } catch (error) {
    console.error('Query execution error:', error);
    throw error;
  }
};

export const listActivePersons = async (id: number, page: number = 1, limit: number = 50): Promise<Person> =>
  executeGetsQuery<Person>(
    `SELECT id, name, address, phone, email, territory, environment, notes, active, dateTime 
    FROM persons 
    WHERE persons.user_id = ?
    AND persons.active = 1
    ORDER BY dateTime ASC
    LIMIT ? OFFSET ?`,
    [id, limit, (page - 1) * limit],
  );

export const getPerson = async (person_id: number): Promise<Person> =>
  executeGetsQuery<Person>(
    `SELECT id, name, address, phone, email, territory, environment, notes, active, dateTime
    FROM persons 
    WHERE persons.id = ?`,
    [person_id],
  );

export const listPersonVisits = async (person_id: number): Promise<Visit> =>
  executeGetsQuery<Visit>(
    `SELECT id, person_id, dateTime, placement, visit_type, visit_notes, created
    FROM visits 
    WHERE person_id = ? 
    ORDER BY dateTime DESC`,
    [person_id],
  );

export const getVisitSql = async (visit_id: number): Promise<Visit> =>
  executeGetsQuery<Visit>(
    `SELECT id, person_id, dateTime, placement, visit_type, visit_notes, created
    FROM visits 
    WHERE id = ? 
    ORDER BY dateTime ASC`,
    [visit_id],
  );
