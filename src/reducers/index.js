import { combineReducers } from 'redux';
import BooksReducer from './reducer_book.js'
import ActiveBook from './reducer_active_book.js'
import AuthReducer from './auth/auth_reducer.js'
import CategoryReducer from './menu/category_reducer.js'
import ProductReducer from './menu/product_reducer.js'

const rootReducer = combineReducers({
  user: AuthReducer,
  books: BooksReducer,
  activeBook: ActiveBook,
  categories: CategoryReducer,
  products: ProductReducer
});

export default rootReducer;
