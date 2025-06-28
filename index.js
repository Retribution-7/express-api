import express from "express";
import { userRouter } from './users/users.js'

const port = 8000;
const app = express();

app.use((req, res, next) => {
  console.log('Время ', Date.now());
  next();
})

app.get('/hello', (req, res) => {
  res.end();
})

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`)
})
