import 'reflect-metadata';
import fakeTodo from '../__fixtures__/fakeTodo';
import TodoModule from '../TodoModule';
import TodoProvider from '../TodoProvider';
import Todo from '../Todo';

describe('TodoProvider', () => {
  let fakeItem: Todo;
  let provider: TodoProvider;

  beforeEach(() => {
    const { injector } = TodoModule;

    // injector.provide({
    //   provide: Firestore,
    //   overwrite: true,
    //   useValue: firebase.app().firestore(),
    // });

    provider = injector.get(TodoProvider);
    fakeItem = fakeTodo();
  });

  it('should create a Todo', async () => {
    const item = await provider.addTodo(fakeItem);
    expect(item).toStrictEqual({
      ...fakeItem,
      id: item.id,
    });
  });

  it('should get a Todo', async () => {
    const newItem = await provider.addTodo(fakeItem);
    const item = await provider.getTodo(newItem.id);
    expect(newItem).toStrictEqual(newItem); // Should be `item` as expect() first arg.
  });

  it('should list Todos', async () => {
    const newItem = await provider.addTodo(fakeItem);
    const item = await provider.listTodos();
    expect(item.find(i => i.id === newItem.id)).toStrictEqual(newItem);
  });

  it('should delete a Todo', async () => {
    const newItem = await provider.addTodo(fakeItem);
    const item = await provider.deleteTodo(newItem.id);
    expect(item).toBeTruthy();
  });

  it('should update a Todo', async () => {
    const updatedTodo = fakeTodo();
    const oldItem = await provider.addTodo(fakeItem);
    const newItem = await provider.updateTodo({
      ...updatedTodo,
      id: oldItem.id,
    });
    expect(newItem).not.toBe(oldItem);
    expect(newItem).toStrictEqual({
      ...updatedTodo,
      id: oldItem.id,
    });
  });
});
