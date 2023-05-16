import { Request, Response, Router } from 'express';
import { TasksController } from './tasks.controller';

export const tasksRouter: Router = Router();

tasksRouter.get('/tasks', async (req: Request, res: Response) => {
    const taskController = new TasksController();
    const getAllTasks= await taskController.getallTasks();
    res.json(getAllTasks).status(200)
})
