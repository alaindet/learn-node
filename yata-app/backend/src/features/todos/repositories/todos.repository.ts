import { getConnection } from '../../../core/database';
import { NotFoundError } from '../errors';
import { Todo } from '../entities';
import { CreateTodoDto, UpdateTodoDto } from '../dtos';

export class TodosRepository {

  table = 'todos';

  async createTodo(dto: CreateTodoDto): Promise<Todo> {

    const db = await getConnection();
    const sql = `
      INSERT INTO ${this.table} (title, is_done)
      VALUES (:title, :is_done)
    `;
    const query = { namedPlaceholders: true, sql };
    const values = { ...dto };
    const result = await db.query(query, values);

    const id = Number(result.insertId);
    const todo: Todo = {
      id,
      title: dto.title,
      is_done: 0,
    };
    db.end();

    return todo;
  }

  async getTodos(): Promise<Todo[]> {
    const db = await getConnection();
    const query = `SELECT * FROM ${this.table}`;
    const todos = await db.query(query);
    db.end();

    return todos;
  }

  async getTodo(_id: string | number): Promise<Todo> {
    const id = Number(_id);
    const db = await getConnection();
    const sql = `SELECT * FROM ${this.table} WHERE id = :id`;
    const values = { id };
    const query = { namedPlaceholders: true, sql };
    const result = await db.query(query, values);
    db.end();

    if (!result.length) {
      throw new NotFoundError(`Todo #${id} not found`);
    }

    return result[0];
  }

  async getTodoByTitle(title: Todo['title']): Promise<Todo | null> {
    const db = await getConnection();
    const sql = `SELECT * FROM ${this.table} WHERE title = :title`;
    const values = { title };
    const query = { namedPlaceholders: true, sql };
    const result = await db.query(query, values);
    db.end();

    return !result.length
      ? null
      : result[0];
  }

  async updateTodo(id: string | number, dto: UpdateTodoDto): Promise<Todo> {

    const setClause = Object.keys(dto)
      .map(prop => `${prop} = :${prop}`)
      .join(', ');

    const todo = await this.getTodo(id);
    const db = await getConnection();
    const sql = `UPDATE ${this.table} SET ${setClause}`;
    const values = { ...dto };
    const query = { namedPlaceholders: true, sql };
    await db.query(query, values);
    db.end();

    return { ...todo, ...dto };
  }

  async deleteTodo(id: string | number): Promise<Todo> {
    const todo = await this.getTodo(id);
    const db = await getConnection();
    const sql = `DELETE FROM ${this.table} WHERE id = :id`;
    const query = { namedPlaceholders: true, sql };
    const values = { id };
    await db.query(query, values);
    db.end();
    return todo;
  }
}
