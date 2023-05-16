/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AppDataSource } from '../..';
import { Task } from './tasks.entity';
import { instanceToPlain } from 'class-transformer';

export class TasksController {
  constructor(private tasksRepository = AppDataSource.getRepository(Task)) {}
  // @ts-ignore
  public async getallTasks(): Promise<Task[]> {
    let allTasks: Task[];

    try {
      allTasks = await this.tasksRepository.find({
        order: {
          date: 'ASC',
        },
      });
      allTasks = instanceToPlain(allTasks) as Task[];
      return allTasks;
    } catch (error) {
      console.log(error);
    }
  }
}
