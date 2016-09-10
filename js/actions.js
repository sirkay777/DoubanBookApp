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
