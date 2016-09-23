import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import DoubanTabBar from './DoubanTabBar';
import AV from 'leancloud-storage';

export default DoubanBookApp  = () => {
    const appId = 'S38XWV3IH9cfKR8j4Hwz9bY4-gzGzoHsz';
    const appKey = '8mhxtSVfCm28dE0IGIHauDmA';
    AV.init({ appId, appKey });
    return (
      <Provider store={createStore(rootReducer, applyMiddleware(thunkMiddleware))}>
        <DoubanTabBar/>
      </Provider>
  );
};
