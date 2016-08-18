import React, {Component} from 'react';
import {Navigator} from 'react-native';
import SearchScreen from './SearchScreen';
import BookDetailScreen from './BookDetailScreen';

export default class DoubanBookApp extends Component{
  routeMapper(route, navigator){
    if(route.name == 'book_detail'){
      return <BookDetailScreen book={route.book} navigator={navigator}/>
    }else{
      return <SearchScreen navigator={navigator}/>;
    }
  }
  render(){
    return <Navigator
      initialRoute={{name:'search'}}
      renderScene={this.routeMapper}
      />
  }
}
