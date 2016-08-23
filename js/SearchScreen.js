import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TextInput,Switch,ScrollView,ListView,
  TouchableHighlight,ActivityIndicator} from 'react-native';
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
        <View style={styles.searchInputWrapper}>
          <TextInput style={styles.searchInput}
            placeholder="请输入搜索关键词"
            onChangeText={text => this.props.onKeywordChange(text)}
            value={this.props.keyword} />
          <ActivityIndicator
           style={styles.loadingIndicator}
           animating={this.props.isLoading}
           />
        </View>
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
    this._renderRow = this._renderRow.bind(this);
    this._renderFooter = this._renderFooter.bind(this);
  }
  _renderRow(book){
    return (
        <TouchableHighlight
          onPress={()=>this.props.selectBook(book)}
          underlayColor='transparent'>
          <View style={styles.bookRow}>
            <Image source={{uri:book.image}} style={styles.bookImage}/>
            <View style={styles.bookRowContent}>
              <Text>{book.title}</Text>
              <Text>{book.author}</Text>
              <Text>{book.rating.average}</Text>
            </View>
          </View>
        </TouchableHighlight>
    )
  }
  _renderFooter()
  {
    return (
      <ActivityIndicator
        animating={this.props.isLoadingTail}/>
      );
  }
  render(){
    let books = this.props.books.filter((book)=>{
      if(this.props.highRatingOnly && book.rating.average < 8.0){
        return false;
      }
      return true;
    });
    return (
      (this.props.keyword && books.length == 0 ) ? <Text>没有搜索结果！</Text>
      : <ListView
        dataSource={this.ds.cloneWithRows(books)}
        renderRow={this._renderRow}
        renderFooter={this._renderFooter}
        onEndReached={this.props.loadMore}
        enableEmptySections={true}
        showsVerticalScrollIndicator={false}
     />
    );
  }
}

var CACHE={
  books:{},
  nextOffset:{},
  total:{}
};

export default class SearchScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      books:[],
      keyword:props.tag,
      highRatingOnly:true,
      isLoading:false,
      isLoadingTail:false,
    };
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this._getBooks = debounce(this._getBooks, 500);
    this.selectBook = this.selectBook.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }
  componentDidMount(){
    if(this.props.tag){
      this._getBooks();
    }
  }
  selectBook(book){
    this.props.navigator.push({
      name: 'book_detail',
      title: book.title + ' 详情',
      book: book
    });
  }
  _getBooks() {
    if(CACHE.books[this.state.keyword]){
      this.setState({books:CACHE.books[this.state.keyword]});
      return;
    }
    this.setState({isLoading:true});
    fetch('https://api.douban.com/v2/book/search?tag=' + this.state.keyword, {mode:'cors'})
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.msg){
          throw new Error(responseJson.msg);
        }
        CACHE.books[this.state.keyword] = responseJson.books;
        CACHE.nextOffset[this.state.keyword] = responseJson.count;
        CACHE.total[this.state.keyword] = responseJson.total;
        this.setState({isLoading:false, books:responseJson.books});
      })
      .catch((error) => {
        console.error(error);
        this.setState({isLoading:false});
      });
  }
  hasMore(){
    return CACHE.nextOffset[this.state.keyword] < CACHE.total[this.state.keyword];
  }
  loadMore(){
    if(!this.hasMore() || this.isLoadingTail) return;
    this.setState({isLoadingTail:true});
    fetch('https://api.douban.com/v2/book/search?tag=' + this.state.keyword
      + '&start=' + CACHE.nextOffset[this.state.keyword], {mode:'cors'})
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.msg){
          throw new Error(responseJson.msg);
        }
        let books = this.state.books.concat(responseJson.books);
        CACHE.books[this.state.keyword] = books;
        CACHE.nextOffset[this.state.keyword] += responseJson.count;
        this.setState({isLoadingTail:false, books:books});
      })
      .catch((error) => {
        console.error(error);
        this.setState({isLoadingTail:false});
      });
  }
  handleKeywordChange(keyword){
    this.setState({
        keyword:keyword
    });
    if(keyword.trim()){
      this._getBooks();
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
      <View style={styles.container}>
        <Logo/>
        <SearchBox keyword={this.state.keyword}
          isLoading={this.state.isLoading}
          highRatingOnly={this.state.highRatingOnly}
          onKeywordChange={this.handleKeywordChange}
          onSwitchChange={this.handleSwitchChange}/>
        <BookList
          books={this.state.books}
          highRatingOnly={this.state.highRatingOnly}
          keyword={this.state.keyword}
          isLoadingTail={this.state.isLoadingTail}
          selectBook={this.selectBook}
          loadMore={this.loadMore}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:30,
    marginTop:50,
  },
  logo:{
    width:153,
    height:30,
  },
  searchInputWrapper:{
    flexDirection:'row',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginVertical: 10,
    padding: 5,
    alignItems: 'center',
  },
  searchInput: {
    flex:8,
    height: 40,
    backgroundColor: 'transparent'
  },
  loadingIndicator:{
    flex:1,
  },
  switchWrapper: {
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
