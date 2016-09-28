import {
  REQUEST_BOOKS, RECEIVE_BOOKS, RATING_FILTER, CHANGE_KEYWORD,
  REQUEST_MORE, RECEIVE_MORE, CHANGE_TAB, ADD_TO_FAV, RECEIVE_FAV_LIST,
  LOG_IN, LOG_OUT
} from './actions';
import {combineReducers} from 'redux';

const input = (state={
  keyword:'',
  highRatingOnly:true
}, action) => {
  switch (action.type) {
    case RATING_FILTER:
      return {...state, highRatingOnly:action.flag};
    case CHANGE_KEYWORD:
      return {...state, keyword:action.keyword};
    default:
      return state;
  }
};

const keyword = (state={
  isLoading: false,
  isLoadingTail: false,
  books: [],
  nextOffset: 0,
  total: null
}, action) => {
  switch (action.type) {
    case REQUEST_BOOKS:
      return {...state, isLoading: true};
    case RECEIVE_BOOKS:
      return {...state,
        isLoading: false,
        books: action.response.books,
        nextOffset: action.response.count,
        total: action.response.total
      };
      case REQUEST_MORE:
        return {...state, isLoadingTail: true};
      case RECEIVE_MORE:
        return {...state,
          isLoadingTail: false,
          books: state.books.concat(action.response.books),
          nextOffset: state.nextOffset + action.response.count,
        };
    default:
      return state;
  }
};

const data = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_BOOKS:
    case RECEIVE_BOOKS:
    case REQUEST_MORE:
    case RECEIVE_MORE:
      return {...state, [action.keyword]:keyword(state[action.keyword], action)};
    default:
      return state;
  }
};

const tab = (state = 'search', action) => {
  switch(action.type) {
    case CHANGE_TAB:
      return action.tab;
    default:
      return state;
  }
};

const fav = (state = [], action) => {
  switch(action.type) {
    case ADD_TO_FAV:
      return [action.book, ...state];
    case RECEIVE_FAV_LIST:
      return action.list;
    default:
      return state;
  }
};

const user = (state = null, action) => {
  switch(action.type) {
    case LOG_IN:
      return action.user;
    case LOG_OUT:
      return null;
    default:
      return state;
  }
};

export default rootReducer = combineReducers({
  input,
  data,
  tab,
  fav,
  user
});
