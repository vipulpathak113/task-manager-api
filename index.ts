import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express} from 'express';
import { DataSource } from 'typeorm';
import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';

const app: Express = express();
import bodyParser = require('body-parser');

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    app.listen(port);
    console.log(`⚡Data source initalizedﻋ Server running on http://localhost:${port}`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/', tasksRouter);
