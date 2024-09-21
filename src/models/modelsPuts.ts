import SSHDBConnection from './index';
import { Person, Visit, Active } from '../utils/types';

const executePutQuery = async (
  sqlStmt: string,
  values: any[],
  errorMsg: string,
): Promise<number> => {
  const connection = await SSHDBConnection;
  try {
    const results = connection.promise().query(sqlStmt, values);
    const result = (await results) as any;

    return result[0].affectedRows;
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
      initial_contact = ?,
      placement = ?,
      visit_type = ?,
      visit_notes = ?,
      created = ?
    WHERE id = ?`,
    [
      data.person_id,
      data.dateTime,
      data.initial_contact,
      data.placement,
      data.visit_type,
      data.visit_notes,
      data.created,
      data.id,
    ],
    'Error updating Visit:',
  );
