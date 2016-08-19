import React, {Component} from 'react';
import {StyleSheet,View,Text,TouchableHighlight,ActivityIndicator} from 'react-native';

class TagList extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading:false,
      tags:[]
    };
  }
  componentDidMount(){
    this.fetchTags();
  }
  fetchTags(){
    this.setState({isLoading:true});
    fetch('https://api.douban.com/v2/book/' + this.props.bookId + '/tags')
    .then(response => response.json())
    .then(responseJson => {
      let tags = responseJson.tags.map(tag=>tag.name);
      this.setState({tags: tags, isLoading:false});
    })
    .catch(error => {
      this.setState({isLoading:false});
      console.log(error);
    } );
  }
  render(){
    let tags = this.state.tags.slice(0,10).map(tag=>{
      return (<Text style={styles.tag} key={tag}>{tag}</Text>);
    });
    return (
      <View>
        <ActivityIndicator
          animating={this.state.isLoading}/>
        <View style={styles.tagsWrapper}>{tags}</View>
      </View>
    );
  }
}
export default class BookDetailScreen extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Text>{this.props.book.title}</Text>
        <TouchableHighlight onPress={()=>this.props.navigator.pop()}>
          <Text style={{color:'blue'}}>Back</Text>
        </TouchableHighlight>
        <TagList bookId={this.props.book.id}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  tagsWrapper: {
    flex:1,
  },
  tag:{
    marginVertical:5,
  }
});
