import './App.css';
import Dashboard from './screens/dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { TOKEN } from './util';

const httpLink = createHttpLink({
  uri: 'https://graph.dev.jit.care/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = TOKEN
  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="dashboard"/>} />
          <Route path='dashboard'>
            <Route index element={<Dashboard />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
