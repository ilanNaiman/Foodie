import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import { Route, Switch, Router } from 'react-router-dom';
import Sagas from './sagas';
import { createBrowserHistory } from 'history';
import Cookies from 'universal-cookie';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { createTransform } from 'redux-persist';
import {parse, stringify} from 'flatted/esm';
import CircularProgress from "@material-ui/core/CircularProgress";
import Favicon from "react-favicon";

//create saga middleware
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const transformCircular = createTransform(
    (inboundState, key) => stringify(inboundState),
    (outboundState, key) => parse(outboundState)
);

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['app', 'AppMenu', 'reviews','Sorting', 'restaurantInfo', 'location', 'restaurants', 'users'],
    transforms: [transformCircular]
};

const pReducer = persistReducer(persistConfig, reducers);

const store = compose(
    composeEnhancers(applyMiddleware(sagaMiddleware)),
)(createStore)(pReducer);
export const persistor = persistStore(store);

//run saga(s)
sagaMiddleware.run(Sagas);
export const history = createBrowserHistory();
export const cookies = new Cookies();

// Render the main component into the dom

ReactDOM.render(
  <Provider store={store}>
      <Favicon url="../public/favicon.ico"/>
          <PersistGate loading={<CircularProgress />} persistor={persistor}>
              <Router history={history}>
                  <Switch>
                      <Route path="/" component={App} />
                  </Switch>
              </Router>
          </PersistGate>
  </Provider>,
  document.getElementById('app'));


