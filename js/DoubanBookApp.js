import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import DoubanTabBar from './DoubanTabBar';



export default DoubanBookApp  = () => {
    return (
      <Provider store={createStore(rootReducer, applyMiddleware(thunkMiddleware))}>
        <DoubanTabBar/>
      </Provider>
  );
};
