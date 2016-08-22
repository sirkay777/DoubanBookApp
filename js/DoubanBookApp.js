import React, {Component} from 'react';
import {Navigator,Text,TouchableHighlight,Platform,StyleSheet} from 'react-native';
import SearchScreen from './SearchScreen';
import BookDetailScreen from './BookDetailScreen';

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
            if (route.name == 'search') {
              return null;
            } else {
              return (
                <TouchableHighlight onPress={() => navigator.pop()} >
                  <Text style={styles.navLeftButton}>&lt; Back</Text>
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
    return <Navigator
      initialRoute={{name:'search', title:'Search', tag:'Programming'}}
      renderScene={this.renderScene}
      navigationBar={this.getNavigationBar()}
      />
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
    fontWeight:'bold'
  }
});
