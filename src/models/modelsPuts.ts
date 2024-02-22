import mysql from './index';
import { Result, Person, Visit, Active } from '../utils/types';

const executePutQuery = async <T>(
  sqlStmt: string,
  values: any[],
  errorMsg: string,
): Promise<number> => {
  const res = await mysql
    .query({ sql: sqlStmt, timeout: 500000, values })
    .catch((error) => {
      mysql.end();
      console.error(errorMsg, error);
      return error;
    });
  const result: Result = res as Result;
  return result.affectedRows;
};

export const updatePersonSql = (data: Person): Promise<number> =>
  executePutQuery(
    `UPDATE persons
    SET
      name = ?,
      address = ?,
      phone = ?,
      email = ?,
      date = ?,
      time = ?,
      territory = ?,
      environment = ?,
      notes = ?
    WHERE id = ?`,
    [
      data.name,
      data.address,
      data.phone,
      data.email,
      data.date,
      data.time,
      data.territory,
      data.environment,
      data.notes,
      data.id,
    ],
    'Error updating Person:',
  );

export const updateActivePersonSql = (data: Active): Promise<number> =>
  executePutQuery(
    `UPDATE persons
    SET
      active = ?
    WHERE id = ?`,
    [data.active, data.id],
    'Error deactivating Person:',
  );

export const updateVisitSql = (data: Visit): Promise<number> =>
  executePutQuery(
    `UPDATE visits
    SET
      person_id = ?,
      date = ?,
      time = ?,
      initial_contact = ?,
      placement = ?,
      visit_type = ?,
      visit_notes = ?,
      created = ?
    WHERE id = ?`,
    [
      data.person_id,
      data.date,
      data.time,
      data.initial_contact,
      data.placement,
      data.visit_type,
      data.visit_notes,
      data.created,
      data.id,
    ],
    'Error updating Visit:',
  );
