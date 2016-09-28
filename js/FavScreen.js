import React, {Component} from 'react';
import {Text, TouchableHighlight,View, ListView} from 'react-native';
import AV from 'leancloud-storage';
import {connect} from 'react-redux';
import { fetchFavList, logOut } from './actions';
import BookCell from './BookCell';

class Fav extends Component{
  componentDidMount(){
    if (!this.props.user) {
      this.props.navigator.push({name:'login'});
    }
    else {
      this.props.fetchFavList();
    }
  }
  render(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if(!this.props.user) return null;
    return (
      <View style={{flex:1, marginTop:30}}>
        <Text>{this.props.user.getUsername()}的收藏</Text>
        <TouchableHighlight onPress={() => {
            AV.User.logOut();
            this.props.logOut();
            this.props.navigator.push({name:'login'});
          }}
          underlayColor='transparent'>
          <Text>登出</Text>
        </TouchableHighlight>
        <ListView
          dataSource={ds.cloneWithRows(this.props.books)}
          renderRow={(book) => <BookCell book={book} selectBook={() => {}}/>}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default FavScreen = connect(
  (state) => {
    return {
      user: state.user,
      books: state.fav
    };
  },
  (dispatch) => {return {
      fetchFavList: ()=>{dispatch(fetchFavList())},
      logOut: ()=>{dispatch(logOut())}
    };
  }
)(Fav);
