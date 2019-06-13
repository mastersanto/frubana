import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';

import Routes from './Routes';

const GRAPHQL_API_URL = 'http://localhost:8080/graphiql';
const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: GRAPHQL_API_URL
  })
});

ReactDOM.render(
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>,
    // @ts-ignore
    document.getElementById('root') as HTMLElement
);
