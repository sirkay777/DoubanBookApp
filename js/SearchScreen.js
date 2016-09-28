import React, { Component } from 'react';
import debounce from 'debounce';
import {StyleSheet,Text,View,Image,TextInput,Switch,ScrollView,ListView,
  TouchableHighlight,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {changeKeyword, setRatingFilter, fetchBooks, fetchMore} from './actions';
import BookCell from './BookCell';

const Logo = ()=>{
  return <Image source={{uri:'https://img3.doubanio.com/f/shire/8308f83ca66946299fc80efb1f10ea21f99ec2a5/pics/nav/lg_main_a11_1.png'}}
    style={styles.logo}/>;
};

const Search = ({
  keyword,
  highRatingOnly,
  isLoading,
  onKeywordChange,
  onSwitchChange
}) => {
  return(
    <View>
      <View style={styles.searchInputWrapper}>
        <TextInput style={styles.searchInput}
          placeholder="请输入搜索关键词"
          onChangeText={text => onKeywordChange(text)}
          value={keyword} />
        <ActivityIndicator
         style={styles.loadingIndicator}
         animating={isLoading}
         />
      </View>
      <View style={styles.switchWrapper}>
        <Switch
          onValueChange={value => onSwitchChange(value)}
          value={highRatingOnly} />
        <Text style={styles.switchText}>只显示8星以上</Text>
      </View>
    </View>
  );
};

const SearchBox = connect(
  (state) => {
    return {
      keyword: state.input.keyword,
      highRatingOnly: state.input.highRatingOnly,
      isLoading: state.data[state.input.keyword]?state.data[state.input.keyword].isLoading:false
    }
  },
  (dispatch) => {
    const _dispatchFetchBooks = ()=>{
      dispatch(fetchBooks());
    }
    const dispatchFetchBooks = debounce(_dispatchFetchBooks, 1000);
    return {
      onKeywordChange:text=>{
        dispatch(changeKeyword(text));
        if(text.trim()){
          dispatchFetchBooks();
        }
      },
      onSwitchChange:flag=>dispatch(setRatingFilter(flag))
    }
  }
)(Search);

const BookList = ({
  isLoadingTail,
  filteredBooks,
  selectBook,
  loadMore
})=>{
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  return (<ListView
    dataSource={ds.cloneWithRows(filteredBooks)}
    renderRow={(book) => <BookCell book={book} selectBook={() => selectBook(book)}/>}
    renderFooter={() => <ActivityIndicator animating={isLoadingTail}/>}
    onEndReached={()=>loadMore()}
    enableEmptySections={true}
    showsVerticalScrollIndicator={false}
 />);
};

const getFilteredBooks = (books, highRatingOnly) => {
  return books.filter((book)=>{
    if(highRatingOnly && book.rating.average < 8.0){
      return false;
    }
    return true;
  })
};

BookList = connect(
  (state) => {
    const keyword = state.input.keyword;
    const highRatingOnly = state.input.highRatingOnly;
    const keywordData = state.data[keyword];
    return {
      isLoadingTail: keywordData ? keywordData.isLoadingTail : false,
      filteredBooks: getFilteredBooks(keywordData?keywordData.books:[], highRatingOnly)
    };
  },
  (dispatch, props) => {
    return {
      selectBook: (book)=>{
        props.navigator.push({
          name: 'book_detail',
          title: book.title.slice(0,30) + ' 详情',
          book: book
        });
      },
      loadMore:()=>{
          dispatch(fetchMore());
      }
    };
  }
)(BookList);

class SearchScreenComponent extends Component{
  componentDidMount(){
    this.props.initSearch();
  }
  render(){
    return (
      <View style={styles.container}>
        <Logo/>
        <SearchBox />
        <BookList navigator={this.props.navigator}/>
      </View>
    );
  }
};

export default SearchScreen = connect(
  null,
  (dispatch, props) => {return{
    initSearch: () => {
      dispatch(changeKeyword(props.tag));
      dispatch(fetchBooks());
    }
  }}
)(SearchScreenComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:5,
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
    height: 30,
    backgroundColor: 'transparent'
  },
  loadingIndicator:{
    flex:1,
  },
  switchWrapper: {
    flexDirection: 'row',
    marginBottom:5,
  },
  switchText: {
    marginLeft:10,
    lineHeight: 25,
  }
});
