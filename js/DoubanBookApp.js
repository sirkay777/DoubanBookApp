import React, {Component} from 'react';
import {Navigator,Text,TouchableHighlight,Platform,StyleSheet} from 'react-native';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import SearchScreen from './SearchScreen';
import BookDetailScreen from './BookDetailScreen';
import rootReducer from './reducers';


export default class DoubanBookApp extends Component{
  renderScene(route, navigator){
    if(route.name == 'book_detail'){
      return <BookDetailScreen book={route.book} navigator={navigator}/>
    }else{
      return <SearchScreen navigator={navigator} tag={route.tag}/>;
    }
  }
  getNavigationBar(){
    return (
      <Navigator.NavigationBar
       routeMapper={{
         LeftButton: (route, navigator, index, navState) =>
          {
            if (route.name == 'home') {
              return null;
            } else {
              return (
                <TouchableHighlight onPress={() => navigator.pop()}
                  underlayColor='transparent'>
                  <Text style={styles.navLeftButton}>&lt; 返回</Text>
                </TouchableHighlight>
              );
            }
          },
          RightButton: (route, navigator, index, navState) =>
           { return null; },
          Title: (route, navigator, index, navState) =>
           { return (<Text style={styles.navTitle}>{route.title}</Text>); },
       }}
       style={styles.navBar}
     />
    );
  }
  render(){
    return (
      <Provider store={createStore(rootReducer, applyMiddleware(thunkMiddleware))}>
        <Navigator
          initialRoute={{name:'home', title:'首页', tag:'计算机'}}
          renderScene={this.renderScene}
          navigationBar={this.getNavigationBar()}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
          />
      </Provider>
  );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#eaffea',
    height:50
  },
  navTitle: {
    fontWeight:'bold',
    paddingTop:(Platform.OS === 'ios') ? 5 : 20,
  },
  navLeftButton:{
    color:'blue',
    paddingTop:(Platform.OS === 'ios') ? 5 : 13,
    paddingLeft:(Platform.OS === 'ios') ? 5 : 0,
    fontWeight:'bold',
    height:50
  }
});
