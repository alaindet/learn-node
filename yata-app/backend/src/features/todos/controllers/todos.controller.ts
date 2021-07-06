import { Request, RequestHandler, Response } from 'express';

import { TodosRepository } from '../repositories/todos.repository';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';

export class TodosController {
  
  todosRepository: TodosRepository;

  // TODO: Use DI?
  constructor() {
    this.todosRepository = new TodosRepository();
  }

  async createTodo(request: Request, response: Response) {

    const dto = new CreateTodoDto();
    dto.title = request.body.title;
    dto.is_done = request.body?.is_done ? 1 : 0;

    const existingTodo = await this.todosRepository.getTodoByTitle(dto.title);

    if (existingTodo) {
      const message = `Todo with title "${dto.title}" already exists`;
      return response.status(400).send({ message });
    }

    const todo = await this.todosRepository.createTodo(dto);

    response.status(201).send(todo);
  }

  async readTodos(request: Request, response: Response) {
    const todos = await this.todosRepository.getTodos();
    response.send(todos);
  }

  async readTodo(request: Request, response: Response) {

    const id = request.params.id;

    try {
      const todo = await this.todosRepository.getTodo(id);
      response.send(todo);
    } catch (err) {
      const message = `Todo with id #${id} was not found`;
      response.status(404).send({ message });
    }
  }

  async updateTodo(request: Request, response: Response) {
    
    const id = request.params.id;

    // Validation draft: populate DTO only with existing input
    const dto = new UpdateTodoDto();
    for (const _key of Object.keys(dto)) {
      const key = _key as keyof UpdateTodoDto;
      if (request.body[key] !== undefined) {
        dto[key] = request.body[key];
      }
    }

    try {
      const todo = await this.todosRepository.updateTodo(id, dto);
      response.send(todo);
    } catch (err) {
      const message = `Todo with id #${id} was not found`;
      response.status(404).send({ message });
    }
  }

  async deleteTodo(request: Request, response: Response) {

    const id = request.params.id;

    try {
      const todo = await this.todosRepository.deleteTodo(id);
      response.send(todo);
    } catch (err) {
      const message = `Todo with id #${id} was not found`;
      response.status(404).send({ message });
    }
  }
}
