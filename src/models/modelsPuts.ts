import getPool from './index';
import { Person, Visit, Active } from '../utils/types';
import { ResultSetHeader } from 'mysql2';

const executePutQuery = async (
  sqlStmt: string,
  values: any[],
  errorMsg: string,
): Promise<number> => {
  const pool = await getPool();
  try {
    const [result] = await pool.promise().query<ResultSetHeader>(sqlStmt, values);
    return result.affectedRows;
  } catch (error) {
    console.error(errorMsg, error);
    throw error;
  }
};

export const updatePersonSql = (data: Person): Promise<number> =>
  executePutQuery(
    `UPDATE persons
    SET
      name = ?,
      address = ?,
      phone = ?,
      email = ?,
      territory = ?,
      environment = ?,
      notes = ?,
      active = ?
    WHERE id = ?`,
    [
      data.name,
      data.address,
      data.phone,
      data.email,
      data.territory,
      data.environment,
      data.notes,
      data.active,
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
      dateTime = ?,
      placement = ?,
      visit_type = ?,
      visit_notes = ?,
      created = ?
    WHERE id = ?`,
    [
      data.person_id,
      data.dateTime,
      data.placement,
      data.visit_type,
      data.visit_notes,
      data.created,
      data.id,
    ],
    'Error updating Visit:',
  );
