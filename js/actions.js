
import AV from 'leancloud-storage';

export const REQUEST_BOOKS = 'REQUEST_BOOKS';
const requestBooks = (keyword) => {
  return{
    type:REQUEST_BOOKS,
    keyword
  };
};

export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
const receiveBooks = (keyword, response) => {
  return {
    type: RECEIVE_BOOKS,
    keyword,
    response
  };
};

export const RATING_FILTER = 'RATING_FILTER';
export const setRatingFilter = (flag) => {
  return {
    type: RATING_FILTER,
    flag
  };
};

export const CHANGE_KEYWORD = 'CHANGE_KEYWORD';
export const changeKeyword = (keyword) => {
  return {
    type: CHANGE_KEYWORD,
    keyword
  };
};

export const REQUEST_MORE = 'REQUEST_MORE';
const requestMore = (keyword) => {
  return {
    type:REQUEST_MORE,
    keyword
  };
};

export const RECEIVE_MORE = 'RECEIVE_MORE';
const receiveMore = (keyword, response) => {
  return {
    type: RECEIVE_MORE,
    keyword,
    response
  };
};

export const fetchBooks = () => {
    return (dispatch, getState) => {
      const state = getState();
      const keyword = state.input.keyword;
      if (!keyword) return;
      if(state.data[keyword]) return;
      dispatch(requestBooks(keyword));
      fetch('https://api.douban.com/v2/book/search?tag=' + keyword)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.msg){
            throw new Error('Douban API Error: ' + responseJson.msg);
          }
          dispatch(receiveBooks(keyword, responseJson));
        })
        .catch((error) => {
          console.error(error);
        });
    };
};

export const fetchMore = () => {
    return (dispatch, getState) => {
      const state = getState();
      const keyword = state.input.keyword;
      if (!keyword) return;
      const keywordData = state.data[keyword];
      if(!keywordData) return;
      const hasMore = keywordData.nextOffset < keywordData.total;
      if(!hasMore || keywordData.isLoadingTail || keywordData.isLoading) return;
      dispatch(requestMore(keyword));
      fetch('https://api.douban.com/v2/book/search?tag=' + keyword
        + '&start=' + keywordData.nextOffset)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.msg){
            throw new Error('Douban API Error: ' + responseJson.msg);
          }
          dispatch(receiveMore(keyword, responseJson));
        })
        .catch((error) => {
          console.error(error);
        });
    };
};

export const CHANGE_TAB = 'CHANGE_TAB';
export const changeTab = (tab) => {
  return {
    type: CHANGE_TAB,
    tab
  };
};

export const ADD_TO_FAV = 'ADD_TO_FAV';
export const addToFav = (book) => {
  return {
      type: ADD_TO_FAV,
      book
  };
};

export const RECEIVE_FAV_LIST = 'RECEIVE_FAV_LIST';
const receiveFavList = (list) => {
  return {
    type: RECEIVE_FAV_LIST,
    list
  };
};

export const fetchFavList = () => {
  return (dispatch, getState) => {
    AV.User.currentAsync().then((currentUser) => {
      const query = new AV.Query('Fav');
      query.equalTo('user', currentUser);
      query.descending('createdAt');
      query.find().then((results) => {
        const list = [];
        results.map((result) => {
          list.push(result.get('book'));
        });
        dispatch(receiveFavList(list));
      });
    }).catch(
      (e)=>console.log(e)
    );
  };
};

export const LOG_IN = 'LOG_IN';
export const logIn = (user) => {
  return{
      type: LOG_IN,
      user
  };
};

export const LOG_OUT = 'LOG_OUT';
export const logOut = () => {
  return{
      type: LOG_OUT
  };
};
