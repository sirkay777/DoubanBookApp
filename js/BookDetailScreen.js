import React, {Component} from 'react';
import {StyleSheet,View,Text,Image,TouchableHighlight,ActivityIndicator,ScrollView} from 'react-native';

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
      title: '标记为 "' + tag + '" 的书',
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
        <Text style={styles.popTagTitle}>热门标签</Text>
        <ActivityIndicator
          animating={this.state.isLoading}/>
        {tags}
      </View>
    );
  }
}
export default class BookDetailScreen extends Component{
  render(){
    return (
      <ScrollView style={styles.container}>
        <View style={styles.detailWrapper}>
          <Image source={{uri:this.props.book.image}} style={styles.bookImage}/>
          <View style={styles.bookDetail}>
            <Text>{this.props.book.title}</Text>
            <Text>{this.props.book.author}</Text>
            <Text>{this.props.book.rating.average}</Text>
          </View>
        </View>
        <Text style={styles.bookSummary}>{this.props.book.summary}</Text>
        <TagList bookId={this.props.book.id} navigator={this.props.navigator}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    paddingVertical:70,
    paddingHorizontal:20,
  },
  tag:{
    marginVertical:5,
    color:'blue',
  },
  detailWrapper:{
    flexDirection:'row'
  },
  bookImage:{
    width:100,
    height:140,
  },
  bookDetail:{
    justifyContent: 'space-between',
    paddingLeft:20
  },
  bookSummary:{
    paddingVertical:15,
  },
  popTagTitle:{
    fontWeight:'bold',
  }
});
