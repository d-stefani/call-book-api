export interface Data {
  data: string[] | number[];
  [Symbol.iterator](): IterableIterator<number | string>;
}

export interface UnauthorizedError extends Error {
  name: 'UnauthorizedError';
  status: number;
  message: string;
}

export type Result = {
  insertId: number;
  length: number;
  affectedRows: number;
};

export interface DbConf {
  host: string;
  database: string;
  user: string;
  password: string;
  multipleStatements?: boolean;
}

export interface Login {
  id?: number;
  password?: string;
  first_name?: string;
  last_name?: string;
  email: string;
}

export interface PersonVisitsLookup {
  user_id: number;
  person_id: number;
  visit_id: number;
}

enum Environment {
  'house to house',
  'informal',
  'phone',
  'letter',
  null,
}

export interface Person extends Data {
  id?: number;
  name: string | null;
  address: string;
  phone: string | null;
  email: string | null;
  date: string;
  time: string;
  territory: string | null;
  environment: Environment;
  notes: string;
  active: number;
  created: string;
}

export interface PersonSearch extends Person {
  search?: string;
}

export interface Active {
  id: number;
  active: number;
}

export interface User {
  id?: number;
  name: string | null;
  email: string | null;
  password: string | null;
  created: string;
}

enum VisitType {
  'in person',
  'text',
  'phone',
  'zoom',
  'email',
}

export interface Visit extends Data {
  id?: number;
  person_id: number;
  dateTime: string;
  initial_contact: number;
  placement: string | null;
  visit_type: VisitType;
  visit_notes: string | null;
  created: string;
}
