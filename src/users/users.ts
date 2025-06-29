import express from "express";
import { LoggerService } from "../logger/logger.service";

const logger = new LoggerService();
const userRouter = express.Router();

userRouter.use((req, res, next) => {
  logger.log('Обработчик users');
  next();
})

userRouter.post('/login', (req, res) => {
  res.send('Login')
})
userRouter.post('/register', (req, res) => {
  res.send('Register')
})


export { userRouter }
