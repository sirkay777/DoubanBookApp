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
  searchTag(tag){
    this.props.navigator.push({
      name: 'search',
      title: 'Search',
      tag: tag
    });
  }
  render(){
    let tags = this.state.tags.slice(0,10).map(tag=>{
      return (
        <TouchableHighlight key={tag} onPress={()=>this.searchTag(tag)}>
          <Text style={styles.tag}>{tag}</Text>
        </TouchableHighlight>
      );
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
        <TagList bookId={this.props.book.id} navigator={this.props.navigator}/>
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
    color:'blue',
  }
});
