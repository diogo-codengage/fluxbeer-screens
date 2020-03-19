import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

import { ApolloProvider } from 'react-apollo';
import {getMainDefinition} from "apollo-utilities";
import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {WebSocketLink} from "apollo-link-ws";
import {split} from "apollo-link";
import {HttpLink} from "apollo-link-http";

import './styles/index.css'

import { MainContext } from "./components/Context";

// @TODO Get url and secret from environment variable
const GRAPHQL_LINK = '//d9ghhvwla3yx5.cloudfront.net/v1/graphql';
const GRAPHQL_HEADERS = {
  "x-hasura-admin-secret": "iDYVRLJsxtpoBUuPS4+zv0zrID7MKSmFOiQ7UD9M"
}

const httpLink = new HttpLink({
  uri: `https:${GRAPHQL_LINK}`,
  headers: GRAPHQL_HEADERS,
});

const wsLink = new WebSocketLink({
  uri: `ws:${GRAPHQL_LINK}`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: GRAPHQL_HEADERS,
    }
  }
})

const link = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

// Now we can render our application into it
render(
  <ApolloProvider client={client}>
    <MainContext>
      <App />
    </MainContext>
  </ApolloProvider>,
  document.getElementById('root'),
);
