import { Request, Response, Router } from 'express';
import { taskController } from './tasks.controller';
import { createValidator, updateValidator } from './tasks.validator';

export const tasksRouter: Router = Router();

// get request
tasksRouter.get('/tasks', (req: Request, res: Response) => {
  return taskController.getallTasks(req, res);
});

//post request
tasksRouter.post('/tasks', createValidator, taskController.createTask);

//put request
tasksRouter.put('/tasks', updateValidator, taskController.updateTask);
