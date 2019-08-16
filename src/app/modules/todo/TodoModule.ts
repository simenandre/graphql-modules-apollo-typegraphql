import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import TodoResolver from './TodoResolver';
import TodoProvider from './TodoProvider';

const resolvers = [TodoResolver];

export default new GraphQLModule({
  name: 'TodoModule',
  providers: () => [TodoProvider, ...resolvers],
  extraSchemas: [
    buildSchemaSync({
      resolvers,
      container: ({ context }) => context.injector,
    }),
  ],
});
