import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import Todo from './Todo';
import TodoProvider from './TodoProvider';
import { TodoInput, TodoUpdateInput } from './TodoInput';

@Resolver(/* istanbul ignore next */ of => Todo)
export default class TodoResolver {
  constructor(private todoProvider: TodoProvider) {}

  @Query(returns => [Todo])
  async listTodos() {
    return this.todoProvider.listTodos();
  }

  @Query(returns => Todo)
  async getTodo(@Arg('id') id: string) {
    return this.todoProvider.getTodo(id);
  }

  @Mutation(returns => Todo)
  async addTodo(@Arg('input') input: TodoInput) {
    return this.todoProvider.addTodo(input);
  }

  @Mutation(returns => Boolean)
  async deleteTodo(@Arg('id') id: string) {
    return this.todoProvider.deleteTodo(id);
  }

  @Mutation(returns => Todo)
  async updateTodo(@Arg('input') input: TodoUpdateInput) {
    return this.todoProvider.updateTodo(input);
  }
}
