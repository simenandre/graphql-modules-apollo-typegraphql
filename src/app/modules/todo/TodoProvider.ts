import { Injectable } from '@graphql-modules/di';
import * as faker from 'faker';
import Todo from './Todo';
import fakeTodo from './__fixtures__/fakeTodo';

@Injectable()
export default class TodoProvider {
  todos = [fakeTodo(), fakeTodo(), fakeTodo()];

  async listTodos(): Promise<Todo[]> {
    return this.todos;
  }

  async getTodo(id: string): Promise<Todo> {
    return this.todos.find(todo => todo.id === id);
  }

  async addTodo(item: Todo): Promise<Todo> {
    this.todos.push(item);
    return {
      ...item,
      id: faker.random.uuid(),
    }
  }

  async deleteTodo(id: string): Promise<boolean> {
    this.todos = this.todos.filter(todo => todo.id === id);
    return true;
  }

  async updateTodo(item: Todo): Promise<Todo> {
    const key = this.todos.findIndex(todo => todo.id === item.id);
    this.todos[key] = item;
    return item;
  }
}
