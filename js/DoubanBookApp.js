import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import DoubanTabBar from './DoubanTabBar';
import AV from 'leancloud-storage';
import { logIn } from './actions';


class Root extends Component{
  componentDidMount(){
    const appId = 'S38XWV3IH9cfKR8j4Hwz9bY4-gzGzoHsz';
    const appKey = '8mhxtSVfCm28dE0IGIHauDmA';
    AV.init({ appId, appKey });
    AV.User.currentAsync().then((currentUser) => {
      this.props.logIn(currentUser);
    });
  }
  render(){
    return <DoubanTabBar/>;
  }
}
const App = connect(
  null,
  (dispatch) => {
    return{
      logIn: (user)=> {dispatch(logIn(user))}
    };
  }
)(Root);

export default DoubanBookApp = () => {
  return (
    <Provider store={createStore(rootReducer, applyMiddleware(thunkMiddleware))}>
      <App/>
    </Provider>
  );
};
