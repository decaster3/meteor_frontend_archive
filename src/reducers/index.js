import { combineReducers } from 'redux';
import BooksReducer from './reducer_book'
import ActiveBook from './reducer_active_book'
import AuthReducer from './auth/auth_reducer'
import PhoneReducer from './auth/phone_reducer'
const rootReducer = combineReducers({
  user: AuthReducer,
  phone: PhoneReducer,
  books: BooksReducer,
  activeBook: ActiveBook
});

export default rootReducer;
