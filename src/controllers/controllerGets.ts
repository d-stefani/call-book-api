import AWS from 'aws-sdk';
import { Request, Response } from 'express';
import * as services from '../services/services';

AWS.config.logger = console;

const handleRequest = (
  serviceFn: (...args: any[]) => Promise<any>,
  successMessage: string,
  failMessage: string,
  req: Request,
  res: Response,
  reqParam?: string,
): void => {
  console.log('REQ PARAM:', reqParam, req.params);
  const param = reqParam ? parseInt(req.params[reqParam]) : undefined;
  serviceFn(param)
    .then((data) => {
      res.status(data ? 200 : 400).json({
        error: !data,
        message: data ? successMessage : failMessage,
        data: {
          getdata: data || {},
        },
      });
    })
    .catch((error) => {
      console.error(`Error ${failMessage}:`, error);
      res.status(500).json({
        error: true,
        message: 'Internal server error',
        data: {},
      });
    });
};

export const getPersons = (req: Request, res: Response): void =>
  handleRequest(
    services.getPersonsSrv,
    'Get Persons success',
    'Get Persons failed',
    req,
    res,
    'id',
  );

export const getPerson = (req: Request, res: Response): void =>
  handleRequest(
    services.getPersonSrv,
    'Get Person success',
    'Get Person failed',
    req,
    res,
    'person_id',
  );

export const getVisit = (req: Request, res: Response): void =>
  handleRequest(
    services.getVisitSrv,
    'Get Personvisit success',
    'Get Person visit failed',
    req,
    res,
    'visit_id',
  );

export const getVisits = (req: Request, res: Response): void =>
  handleRequest(
    services.getVisitsSrv,
    'Get Persons visits success',
    'Get Persons visits failed',
    req,
    res,
    'person_id',
  );
