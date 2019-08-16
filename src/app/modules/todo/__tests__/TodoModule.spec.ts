/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-non-null-assertion: 0 */
import 'reflect-metadata';
import { execute } from 'graphql';
import gql from 'graphql-tag';
import * as faker from 'faker';
import TodoModule from '../TodoModule';
import fakeTodo from '../__fixtures__/fakeTodo';
import TodoProvider from '../TodoProvider';
import Todo from '../Todo';

describe('TodoModule', () => {
  const { schema, context, injector } = TodoModule;

  const fakeItem = fakeTodo();

  beforeEach(async () => {
    // @ts-ignore
    injector.provide({
      provide: TodoProvider,
      overwrite: true,
      useValue: {
        listTodos: async () => [fakeItem],
        getTodo: async (i: string) => fakeItem,
        addTodo: async (m: Todo) => ({ id: 'add-todo-id', ...m }),
        deleteTodo: async (i: string) => true,
        updateTodo: async (m: Todo) => ({ id: fakeItem.id, ...m }),
      },
    });
  });

  it('should resolve listTodos Query', async () => {
    const result = await execute({
      schema,
      contextValue: context,
      document: gql`
        query listTodos {
          listTodos {
            id
            title
          }
        }
      `,
    });

    console.log(result);

    expect(result.errors).toBeFalsy();

    expect(result.data!.listTodos[0].id).toBe(fakeItem.id);
    expect(result.data!.listTodos[0].title).toBe(fakeItem.title);
  });

});
