
import {createStore, applyMiddleware, compose} from 'redux';

import rootReducer from './reducers';
import thunk from 'redux-thunk';



const composeEnhancers =
  // start commenting out from here in production to hide redux from showing in dev tools
  process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) :
    // end the commenting out of react dev tools here 
     compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);








const store = createStore(rootReducer, enhancer);

export default store;