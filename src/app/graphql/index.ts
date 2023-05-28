import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const githubGraphqlURI = process.env.NEXT_PUBLIC_GITHUB_GRAPHQL_URI;

let GITHUB_TOKEN = "";
const setToken = (token: string) => (GITHUB_TOKEN = token);

const link = new HttpLink({ uri: githubGraphqlURI });

const setAuthorizationLink = setContext((request, previousContext) => ({
  headers: {
    ...previousContext.headers,
    authorization: `Bearer ${GITHUB_TOKEN}`,
  },
}));

const client = new ApolloClient({
  link: setAuthorizationLink.concat(link),
  cache: new InMemoryCache(),
});

export * from "./ops";
export { client, setToken };
