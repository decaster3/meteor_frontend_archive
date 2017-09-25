import { combineReducers } from 'redux';
import BooksReducer from './reducer_book.js'
import ActiveBook from './reducer_active_book.js'
import AuthReducer from './auth/auth_reducer.js'
import ProfileReducer from './profile/profile_reducer.js'

const rootReducer = combineReducers({
  user: AuthReducer,
  books: BooksReducer,
  activeBook: ActiveBook,
  profile: ProfileReducer,

});

export default rootReducer;
