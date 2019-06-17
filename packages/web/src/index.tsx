import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';

import Routes from './Routes';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql'
});

const wsLink = new WebSocketLink({
	uri: `ws://localhost:8080/graphql`,
	options: {
		reconnect: true
	}
});

const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return (
          kind === 'OperationDefinition' && operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
);

const link = ApolloLink.from([terminatingLink]);

const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>,
    document.getElementById('root') as HTMLElement
);
