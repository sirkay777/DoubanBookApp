import React, {Component} from 'react';
import {Navigator,Text,TouchableHighlight} from 'react-native';
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
                  <Text style={{color:'blue',paddingTop:5,paddingLeft:5,fontWeight:'bold'}}>&lt; Back</Text>
                </TouchableHighlight>
              );
            }
          },
          RightButton: (route, navigator, index, navState) =>
           { return null; },
          Title: (route, navigator, index, navState) =>
           { return (<Text style={{fontWeight:'bold', paddingTop:5}}>{route.title}</Text>); },
       }}
       style={{backgroundColor: '#eaffea',height:50}}
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
