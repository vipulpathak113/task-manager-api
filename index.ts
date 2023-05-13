import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

const app: Express = express();
import cors from 'cors';
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
  synchronize: true,
});

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World3');
});

AppDataSource.initialize()
  .then(() => {
    app.listen(port);
    console.log(`⚡ﻋ Data source initalized`);
  })
  .catch((err) => {
    console.log(err);
  });
