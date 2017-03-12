import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';

// Touch tap support for react
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

/* eslint no-extend-native: ["error", { "exceptions": ["String"] }] */
// Improve string prototype
String.prototype.formalize = function() {
  const arr = this.split(/(?=[A-Z])/);
  arr[0] = arr[0].capitalizeFirstChar();
  return arr.join(' ');
};

String.prototype.capitalizeFirstChar = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const routes = require('./routes/index').default(store);

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  );
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  };
};

// ========================================================
// Go!
// ========================================================
render();
