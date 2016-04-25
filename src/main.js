import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { switchesApp } from './reducers';
import { requestState } from './actions';
import App from './components/App';


let store = createStore(switchesApp, applyMiddleware(thunk));

// Setup poller
setInterval(() => {
	store.dispatch(requestState())
}, 5000);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-container')
);