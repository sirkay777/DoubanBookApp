import React, {Component} from 'react';
import {Text, TouchableHighlight,View} from 'react-native';
import AV from 'leancloud-storage';

export default class FavScreen extends Component{
  componentDidMount(){
    AV.User.currentAsync().then((currentUser) => {
      console.log(currentUser);
      if (!currentUser) {
        this.props.navigator.push({name:'login'});
      }
      else {
        //fetch fav
      }
    }).catch(
      (e)=>console.log(e)
    );
  }
  render(){
    return (
      <View style={{flex:1, alignItems:'center'}}>
        <Text>Fav</Text>
        <TouchableHighlight onPress={() => AV.User.logOut()}
          underlayColor='transparent'>
          <Text>登出</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
