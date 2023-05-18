import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';
import { AppDataSource } from '../..';
import { Task } from './tasks.entity';

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

  public async updateTask(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Try to find if the tasks exists
    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.body.id },
      });
    } catch (errors) {
      return res.json({ error: 'Internal Server Error' }).status(500);
    }

    // Return 400 if task is null
    if (!task) {
      return res.status(404).json({
        error: 'The task with given ID does not exist',
      });
    }

    // Declare a variable for updatedTask
    let updatedTask: UpdateResult;

    // Update the task
    try {
      updatedTask = await AppDataSource.getRepository(Task).update(
        req.body.id,
        plainToInstance(Task, {
          status: req.body.status,
        }),
      );

      // Convert the updatedTask instance to an object
      updatedTask = instanceToPlain(updatedTask) as UpdateResult;

      return res.json(updatedTask).status(200);
    } catch (errors) {
      return res.json({ error: 'Internal Server Error' }).status(500);
    }
  }
}

export const taskController = new TasksController();
