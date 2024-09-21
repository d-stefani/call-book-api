import AWS from 'aws-sdk';

import {
  Login,
  Person,
  Visit,
  Active,
  PersonSearch,
  Data,
} from '../utils/types';
import * as modelsPosts from '../models/modelsPosts';
import * as modelsGets from '../models/modelsGets';
import * as modelsPuts from '../models/modelsPuts';

AWS.config.logger = console;

export const postLoginSrv = async (data: Login): Promise<Login> => {
  return await modelsPosts.loginSql(data);
};

export const postPersonSrv = async (data: Person): Promise<number> => {
  const Id: number = await modelsPosts.insertPersonsSql(data);
  return Id;
};

export const postSearchSrv = async (
  data: PersonSearch,
): Promise<number | PersonSearch> => {
  return await modelsPosts.searchPersonSql(data);
};

export const postVisitSrv = async (data: Visit): Promise<Visit> => {
  await modelsPosts.insertVisitSql(data);
  return data;
};

export const getPersonsSrv = async (): Promise<Person> => {
  return await modelsGets.listActivePersons();
};

export const getPersonSrv = async (person_id: number): Promise<Person> => {
  console.log('PERSON_ID:', person_id);
  return await modelsGets.getPerson(person_id);
};

export const getVisitsSrv = async (person_id: number): Promise<Visit> => {
  return await modelsGets.listPersonVisits(person_id);
};

export const getVisitSrv = async (visit_id: number): Promise<Visit> => {
  return await modelsGets.getVisitSql(visit_id);
};

export const putPersonSrv = async (data: Person): Promise<number> => {
  console.log('DATA:', data.data);
  const dataSend: any = data.data;
  const affected: number = await modelsPuts.updatePersonSql(dataSend);
  console.log('AFFECTED:', affected);
  return affected;
};

export const putActivePersonSrv = async (data: Active): Promise<number> => {
  return await modelsPuts.updateActivePersonSql(data);
};

export const putVisitSrv = async (data: Visit): Promise<number> => {
  console.log('DATA:', data.data);
  const dataSend: any = data.data;
  return await modelsPuts.updateVisitSql(dataSend);
};
