import { ApolloServer } from 'apollo-server-express';
import * as cors from 'cors';
import * as express from 'express';

import { createServer, Server } from 'http';
//import { SubscriptionServer } from 'subscriptions-transport-ws';

import resolvers from './resolvers';
import typeDefs from './typeDefs';


export default async (port: number): Promise<Server> => {
  const app = express();

  const server: Server = createServer(app);

  app.use('*', cors({ origin: 'http://localhost:3000' }));

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true
  });

  apolloServer.applyMiddleware({ app, path: '/graphql' });
  apolloServer.installSubscriptionHandlers(server);

  server.listen({ port: 8080 }, () => {
    console.log(`🚀 Server ready`);
  });
};
