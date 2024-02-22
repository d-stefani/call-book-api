import serverless from 'serverless-http';
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import basicAuth from 'express-basic-auth';
import { Secret, sign } from 'jsonwebtoken';
import { UnauthorizedError } from './utils/types';
import { GetVerificationKey, expressjwt as jwt } from 'express-jwt';

const app = express();
console.log('first', process.env.JWT_KEY);

const errorReqHandler: ErrorRequestHandler = (
  err: UnauthorizedError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send({ message: err.message });
    return;
  }
  next();
};

app.use(errorReqHandler);

app.use(cookieParser());
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  jwt({
    secret: process.env.JWT_KEY as Secret | GetVerificationKey,
    algorithms: ['HS256'],
  }).unless({
    path: ['/api/auth'],
  }),
);

// routes
import authRoutes from './routes/auth';
import router from './routes/routes';

app.use('/api/login', router);
app.use('/', router);

const users = { ['dstefani' as string]: process.env.AUTH_PASS as string };
app.use('/api/auth', basicAuth({ users }), authRoutes(sign));

export const handler = serverless(app);
