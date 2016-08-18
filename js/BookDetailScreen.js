import React, {Component} from 'react';
import {View,Text,TouchableHighlight} from 'react-native';

export default class BookDetailScreen extends Component{
  render(){
    return (
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <Text>{this.props.book.title}</Text>
        <TouchableHighlight onPress={()=>this.props.navigator.pop()}>
          <Text style={{color:'blue'}}>Back</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
