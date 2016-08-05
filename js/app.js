import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Switch,
  ScrollView,
  ListView
} from 'react-native';
import debounce from 'debounce';

class Logo extends Component{
  render(){
    return (
      <Image source={{uri:'https://img3.doubanio.com/f/shire/8308f83ca66946299fc80efb1f10ea21f99ec2a5/pics/nav/lg_main_a11_1.png'}}
        style={styles.logo}/>
    );
  }
}

class SearchBox extends Component{
  render(){
    return (
      <View>
        <TextInput style={styles.searchInput}
          placeholder="请输入搜索关键词"
          onChangeText={text => this.props.onKeywordChange(text)}
          value={this.props.keyword} />
        <View style={styles.switchWrapper}>
          <Switch
            onValueChange={value => this.props.onSwitchChange(value)}
            value={this.props.highRatingOnly} />
          <Text style={styles.switchText}>只显示8星以上</Text>
        </View>
      </View>
    );
  }
}

class BookList extends React.Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }
  _renderRow(book){
    return (
      <View style={styles.bookRow}>
        <Image source={{uri:book.image}} style={styles.bookImage}/>
        <View style={styles.bookRowContent}>
          <Text>{book.title}</Text>
          <Text>{book.author}</Text>
          <Text>{book.rating.average}</Text>
        </View>
      </View>
    )
  }
  render(){
    let books = this.props.books.filter((book)=>{
      if(this.props.highRatingOnly && book.rating.average < 8.0){
        return false;
      }
      return true;
    });
    return (
      <ListView
        dataSource={this.ds.cloneWithRows(books)}
        renderRow={this._renderRow}
     />
    );
  }
}

export default class DoubanBookSearch extends Component{
  constructor(props) {
    super(props);
    this.state = {
      books:[],
      keyword:'',
      highRatingOnly:false
    };
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this._getBooks = debounce(this._getBooks, 1000);
  }
  _getBooks(keyword) {
    fetch('https://api.douban.com/v2/book/search?q=' + keyword, {mode:'cors'})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({books:responseJson.books});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  handleKeywordChange(keyword){
    this.setState({
        keyword:keyword
    });
    if(keyword.trim()){
      this._getBooks(keyword);
    }else{
      this.setState({books:[]});
    }
  }
  handleSwitchChange(value){
    this.setState({
      highRatingOnly:value
    });
  }
  render(){
    return (
      <ScrollView style={styles.container}>
        <Logo/>
        <SearchBox keyword={this.state.keyword}
          highRatingOnly={this.state.highRatingOnly}
          onKeywordChange={this.handleKeywordChange}
          onSwitchChange={this.handleSwitchChange}/>
        <BookList
          books={this.state.books}
          highRatingOnly={this.state.highRatingOnly} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:30,
  },
  logo:{
    width:153,
    height:30,
  },
  searchInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    height: 40,
    padding: 5,
    marginVertical: 10,
  },
  switchWrapper: {
    flex:1,
    flexDirection: 'row',
    marginBottom:15,
  },
  switchText: {
    marginLeft:10,
    lineHeight: 25,
  },
  bookRow:{
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  bookRowContent:{
    marginLeft: 15,
  },
  bookImage:{
    width:100,
    height:140,
  }
});
