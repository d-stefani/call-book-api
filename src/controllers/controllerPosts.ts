import AWS from 'aws-sdk';
import { Request, Response } from 'express';
import * as services from '../services/services';

AWS.config.logger = console;

const handlePostRequest = (
  serviceFn: (data: any) => Promise<any>,
  successMessage: string,
  failMessage: string,
  req: Request,
  res: Response,
  successDataKey: string,
): void => {
  serviceFn(req.body)
    .then((data) => {
      res.status(data ? 200 : 400).json({
        error: !data,
        message: data ? successMessage : failMessage,
        data: {
          [successDataKey]: data || {},
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

export const postSearch = (req: Request, res: Response): void =>
  handlePostRequest(
    services.postSearchSrv,
    'Search success',
    'No records found',
    req,
    res,
    'data',
  );

export const postLogin = (req: Request, res: Response): void =>
  handlePostRequest(
    services.postLoginSrv,
    'Login success',
    'User not found',
    req,
    res,
    'data',
  );

export const postPersons = (req: Request, res: Response): void =>
  handlePostRequest(
    services.postPersonSrv,
    'Add Person success',
    'New Person insert failed',
    req,
    res,
    'persons',
  );

export const postVisits = (req: Request, res: Response): void =>
  handlePostRequest(
    services.postVisitSrv,
    'Add Visit success',
    'New Visit insert failed',
    req,
    res,
    'visits',
  );
