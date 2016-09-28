import React, {Component} from 'react';
import {StyleSheet,View,Text,Image,TouchableHighlight,ActivityIndicator,ScrollView, AlertIOS} from 'react-native';
import AV from 'leancloud-storage';
import {connect} from 'react-redux';
import { addToFav } from './actions';

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

const BookDetail = ({
  book,
  navigator,
  addToFav
})=>{
  return (
    <ScrollView contentContainerStyle={styles.container} >
      <View style={styles.detailWrapper}>
        <Image source={{uri:book.image}} style={styles.bookImage}/>
        <View style={styles.bookDetail}>
          <Text>{book.title}</Text>
          <Text>{book.author}</Text>
          <Text>{book.rating.average}</Text>
          <TouchableHighlight underlayColor='transparent' onPress={()=>{
            AV.User.currentAsync().then((currentUser) => {
              if (!currentUser) {
                navigator.push({name:'login'});
              }
              else {
                addToFav(book);
                AlertIOS.alert(
                 'Success!',
                 'Added to Fav!'
                );
              }
            }).catch(
              (e)=>console.log(e)
            );
          }}>
            <Text style={styles.addToFav}>收藏</Text>
          </TouchableHighlight>
        </View>
      </View>
      <Text style={styles.bookSummary}>{book.summary}</Text>
      <TagList tags={book.tags} navigator={navigator}/>
    </ScrollView>
  );
};

export default BookDetailScreen = connect(
  null,
  (dispatch) => {
    return {addToFav: (book)=>{
      dispatch(addToFav(book));
      const Fav = AV.Object.extend('Fav');
      const fav = new Fav();
      AV.User.currentAsync().then((currentUser) => {
        fav.set('user', currentUser);
        fav.set('book', book);
        fav.save();
      }).catch(
        (e)=>console.log(e)
      );
    }};
  }
)(BookDetail);


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
  },
  addToFav:{
    color:'green'
  }
});
