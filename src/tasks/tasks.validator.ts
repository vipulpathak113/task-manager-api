import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .trim()
    .isString()
    .withMessage('Title must be a string'),
  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .trim()
    .isString()
    .withMessage('Date must be a string'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .trim()
    .isString()
    .withMessage('Description must be a string'),
  body('priority')
    .trim()
    .isIn([Priority.normal, Priority.low, Priority.high])
    .withMessage('Priority must be one of these values: normal,low,high'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Priority must be one of these values: normal,low,high'),
];

export const updateValidator: ValidationChain[] = [
  body('id')
    .notEmpty()
    .withMessage('Id is required')
    .trim()
    .isString()
    .withMessage('ID must be a valid uuid string'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Priority must be one of these values: normal,low,high')
];
