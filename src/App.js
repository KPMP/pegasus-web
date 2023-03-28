import React, { Component } from 'react';
import { NavBar, NavFooter } from 'kpmp-common-components';
import loadedState from './initialState';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { default as ReactGA4 } from 'react-ga4';
import { createBrowserHistory } from 'history';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ErrorBoundaryContainer from './components/Error/ErrorBoundaryContainer';
import Oops from './components/Error/Oops';
import Home from './components/Home/Home';
import Explorer from './components/Explorer/Explorer';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './helpers/ApolloClient';
import GeneSummaryContainer from './components/Summary/GeneSummaryContainer';
import CellTypeSummaryContainer from './components/Summary/CellTypeSummaryContainer';
import NotFoundPage from './components/Error/NotFoundPage';
import RNASeqVizContainer from "./components/DataViz/RNASeqVizContainer";
import DiffexByClusterContainer from "./components/ExpressionTables/DiffexByClusterContainer";
import RegionalVizContainer from "./components/DataViz/RegionalVizContainer";
import { baseURL } from '../package.json';
import { PrivateUmapRoute } from './PrivateRoutes';
import UMAPContainer from './components/DataViz/UMAPContainer';

const cacheStore = window.sessionStorage.getItem('redux-store');
const initialState = cacheStore ? JSON.parse(cacheStore) : loadedState;
export const store = applyMiddleware(thunk)(createStore)(
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
const GA_TRACKING_ID = 'G-64W6E37TQB';

ReactGA4.initialize(GA_TRACKING_ID, { testMode: process.env.NODE_ENV === 'test' });

function logPageView(location, action) {
  ReactGA4.set({ page: location.pathname + location.search });
  ReactGA4.pageview(location.pathname + location.search);
}
const history = createBrowserHistory();
history.listen((location, action) => {
  logPageView(location, action);
});

store.subscribe(function () {
  console.log(store.getState());
});

store.subscribe(saveState);

class App extends Component {
  UNSAFE_componentWillMount() {
    logPageView(window.location, '');
  }

  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <BrowserRouter basename={baseURL} history={history}>
            <ErrorBoundaryContainer>
              <NavBar app='atlas' />
              <Switch>
                <Route exact path='/' history={this.props.history}  component={Home} store={store} />
                <Route exact path='/explorer' component={Explorer} store={store} />
                <Route exact path='/explorer/genesummary' component={GeneSummaryContainer} store={store} />
                <Route exact path='/explorer/celltypesummary' component={CellTypeSummaryContainer} store={store} />
                <Route exact path='/explorer/dataViz' component={RNASeqVizContainer} store={store} />
                <Route exact path='/explorer/regionalviz' component={RegionalVizContainer} store={store} />
                <Route exact path='/explorer/diffex' component={DiffexByClusterContainer} store={store} />
                <Route exact path='/oops' component={Oops} />
                <PrivateUmapRoute exact path='/explorer/dataViz/umap' component={UMAPContainer} store={store} />
                <Route path='*' component={NotFoundPage} />
              </Switch>
              <NavFooter app='atlas' />
            </ErrorBoundaryContainer>
          </BrowserRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
