import express from 'express';
import authController from '../controllers/authController';

export default (sign: Function) => {
  const router = express.Router();
  router.get('/', authController(sign).get);
  return router;
};
