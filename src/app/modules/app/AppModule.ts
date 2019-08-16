import { GraphQLModule } from '@graphql-modules/core';
import TodoModule from '../todo/TodoModule';

export default new GraphQLModule({
  name: 'AppModule',
  imports: () => [
    TodoModule
  ],
});
