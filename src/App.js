import React, { Component } from 'react';
import NavBar from './components/Nav/NavBar';
import NavFooter from './components/Nav/NavFooter';
import loadedState from './initialState';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactGA from 'react-ga';
import { createBrowserHistory }  from 'history';
import { Route, Switch, Router } from 'react-router-dom';
import ErrorBoundaryContainer from './components/Error/ErrorBoundaryContainer';
import Oops from './components/Error/Oops';
import Directions from './components/Directions';
import TestSearchApollo from "./components/TestSearchApollo";
import TestSearchApolloHOC from "./components/TestSearchApolloHOC";
import TestSearchRenderer from "./components/TestSearchRenderer";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const cacheStore = window.sessionStorage.getItem('redux-store');
const initialState = cacheStore ? JSON.parse(cacheStore) : loadedState;
const store = applyMiddleware(thunk)(createStore)(
  appReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const saveState = () => {
  window.sessionStorage.setItem(
    'redux-store',
    JSON.stringify(store.getState())
  );
};

// *** Get a new tracking Id and add it here *** //
const GA_TRACKING_ID = 'UA-124331187-10';

ReactGA.initialize(GA_TRACKING_ID, { testMode: process.env.NODE_ENV === 'test' });
function logPageView(location, action) {
  ReactGA.set({ page: location.pathname + location.search });
  ReactGA.pageview(location.pathname + location.search);
}
const history = createBrowserHistory();
history.listen((location, action) => {
  logPageView(location, action);
});

store.subscribe(function() {
  console.log(store.getState());
});

store.subscribe(saveState);

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache(),
    fetchOptions: {
        mode: 'no-cors',
    },
});

class App extends Component {
  componentWillMount() {
    logPageView(window.location, '');
  }

  render() {
    return (
      <Provider store={store}>
          <ApolloProvider client={client}>
          <Router history={history}>
            <NavBar />
            <Switch>
              <Route exact path="/oops" component={Oops} />
              <Route exact path="/" render={() => <TestSearchApolloHOC geneSearch={"APOL"}/>} />
                <Route exact path="/tsr" render={() => <TestSearchRenderer geneSearch={"EGF"}/>} />
            </Switch>
            <NavFooter />
        </Router>
          </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
