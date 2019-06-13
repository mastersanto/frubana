/*
import ApolloClient from 'apollo-boost';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';
*/

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';

// import App from './App';
import Routes from './Routes';

const GRAPHQL_API_URL = 'http://localhost:8080/graphql';
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

/*
const client = new ApolloClient({
  clientState: {
    resolvers: {
      Query: {
        localHello(obj: any, { subject }: { subject: string }) {
          return `Hello, ${subject}! from Web UI`;
        }
      }
    }
  },
  uri: GRAPHQL_API_URL
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
*/
