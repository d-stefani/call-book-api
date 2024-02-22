import AWS from 'aws-sdk';
import { Request, Response } from 'express';
import * as services from '../services/services';

AWS.config.logger = console;

const handlePutRequest = (
  serviceFn: (data: any) => Promise<any>,
  successMessage: string,
  failMessage: string,
  req: Request,
  res: Response,
): void => {
  serviceFn(req.body)
    .then((affectedRows) => {
      res.status(affectedRows ? 200 : 400).json({
        error: !affectedRows,
        message: affectedRows ? successMessage : failMessage,
        data: {
          affected_rows: affectedRows || {},
        },
      });
    })
    .catch((error) => {
      console.error(`${failMessage}:`, error);
      res.status(500).json({
        error: true,
        message: 'Internal server error',
        data: {},
      });
    });
};

export const person = (req: Request, res: Response): void =>
  handlePutRequest(
    services.putPersonSrv,
    'Update Person success',
    'Update Person Failed',
    req,
    res,
  );

export const personActive = (req: Request, res: Response): void =>
  handlePutRequest(
    services.putActivePersonSrv,
    'Update Active success',
    'Update Active Failed',
    req,
    res,
  );

export const putVisit = (req: Request, res: Response): void =>
  handlePutRequest(
    services.putVisitSrv,
    'Update Visit success',
    'Update Visit Failed',
    req,
    res,
  );
