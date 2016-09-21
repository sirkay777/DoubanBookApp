import React, {Component} from 'react';
import {StyleSheet,View,Text,Image,TouchableHighlight,ActivityIndicator,ScrollView} from 'react-native';

class TagList extends Component{
  searchTag(tag){
    this.props.navigator.push({
      name: 'search',
      title: '标记为 "' + tag + '" 的书',
      tag: tag
    });
  }
  render(){
    let tags = this.props.tags.map(tag=>{
      return (
        <TouchableHighlight underlayColor='transparent' key={tag.name} onPress={()=>this.searchTag(tag.name)}>
          <Text style={styles.tag}>{tag.name}</Text>
        </TouchableHighlight>
      );
    });
    return (
      <View>
        <Text style={styles.popTagTitle}>热门标签</Text>
        <View style={styles.tagsContainer}>{tags}</View>
      </View>
    );
  }
}
export default class BookDetailScreen extends Component{
  render(){
    return (
      <ScrollView contentContainerStyle={styles.container} >
        <View style={styles.detailWrapper}>
          <Image source={{uri:this.props.book.image}} style={styles.bookImage}/>
          <View style={styles.bookDetail}>
            <Text>{this.props.book.title}</Text>
            <Text>{this.props.book.author}</Text>
            <Text>{this.props.book.rating.average}</Text>
          </View>
        </View>
        <Text style={styles.bookSummary}>{this.props.book.summary}</Text>
        <TagList tags={this.props.book.tags} navigator={this.props.navigator}/>
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
    borderWidth:1,
    borderColor:'#cccccc',
    padding:5,
    marginRight:10
  },
  detailWrapper:{
    flexDirection:'row'
  },
  bookImage:{
    width:100,
    height:140,
  },
  bookDetail:{
    flex:1,
    justifyContent: 'space-between',
    paddingLeft:20,
  },
  bookSummary:{
    paddingVertical:15,
  },
  popTagTitle:{
    fontWeight:'bold',
  },
  tagsContainer:{
    flex:1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    height:40
  }
});
