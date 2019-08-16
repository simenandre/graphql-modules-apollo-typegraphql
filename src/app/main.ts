/* eslint no-console: ["error", { allow: ["log"] }] */
import { ApolloServer } from 'apollo-server';
import AppModule from './modules/app/AppModule';

export default class Main {
  private server: ApolloServer;

  public async boot(): Promise<void> {
    const { schema, context } = AppModule;

    this.server = new ApolloServer({
      schema,
      context,
      introspection: true,
      cors: false,
    });
  }

  public async start(port: string = process.env.PORT || '4000'): Promise<void> {
    await this.boot();
    const { url } = await this.server.listen(port);
    console.log(`🚀  Server ready at ${url}`);
  }

  public async close(): Promise<void> {
    await this.server.stop();
  }
}
