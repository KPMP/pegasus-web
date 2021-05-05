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
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ErrorBoundaryContainer from './components/Error/ErrorBoundaryContainer';
import Oops from './components/Error/Oops';
import Home from './components/Home/Home';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './helpers/ApolloClient';
import GeneSummaryContainer from './components/Summary/GeneSummaryContainer';
import CellTypeSummaryContainer from './components/Summary/CellTypeSummaryContainer';
import NotFoundPage from './components/Error/NotFoundPage';
import RNASeqVizContainer from "./components/DataViz/RNASeqVizContainer";
import DiffexByClusterContainer from "./components/ExpressionTables/DiffexByClusterContainer";
import RegionalVizContainer from "./components/DataViz/RegionalVizContainer";

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

class App extends Component {
  componentWillMount() {
    logPageView(window.location, '');
  }

  render() {
    return (
      <Provider store={store}>
          <ApolloProvider client={apolloClient}>
              <BrowserRouter basename='/explorer' history={history}>
                  <ErrorBoundaryContainer>
                    <NavBar />
                    <Switch>
                        <Route exact path='/genesummary' component={GeneSummaryContainer} store={store} />
                        <Route exact path='/celltypesummary' component={CellTypeSummaryContainer} store={store} />
                        <Route exact path='/' component={Home} store={store} />
                        <Route path='/dataViz' component={RNASeqVizContainer} store={store}/>
                        <Route path='/regionalviz' component={RegionalVizContainer} store={store}/>
                        <Route path='/diffex' component={DiffexByClusterContainer} store={store}/>
                        <Route exact path='/oops' component={Oops} />
                        <Route path='*' component={NotFoundPage} />
                    </Switch>
                    <NavFooter />
                  </ErrorBoundaryContainer>
                </BrowserRouter>
          </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
