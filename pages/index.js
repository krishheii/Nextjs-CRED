import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App.js';
import reducers from './reducers';

const composeEnhancers =  compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

class Curd extends React.Component {

  render() {
    return (<Provider store={store}>
      <App />
    </Provider>);
  }
}

export default Curd
