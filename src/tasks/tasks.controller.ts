import { AppDataSource } from '../..';
import { Task } from './tasks.entity';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { validationResult } from 'express-validator';

class TasksController {
  public async getallTasks(req: Request, res: Response): Promise<Response> {
    let allTasks: Task[];

    try {
      allTasks = await AppDataSource.getRepository(Task).find({
        order: {
          date: 'ASC',
        },
      });
      allTasks = instanceToPlain(allTasks) as Task[];
      return res.json(allTasks).status(200);
    } catch (error) {
      return res.json({ error: 'Internal server error' }).status(200);
    }
  }

  public async createTask(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, date, priority, status } = req.body;

    const newTask = new Task();
    newTask.title = title;
    newTask.description = description;
    newTask.date = date;
    newTask.priority = priority;
    newTask.status = status;

    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(Task).save(newTask);

      createdTask = instanceToPlain(createdTask) as Task;
      return res.json(createdTask).status(200);
    } catch (err) {
      return res.json({ error: 'Internal server error' }).status(200);
    }
  }
}

export const taskController = new TasksController();
