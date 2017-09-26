import { combineReducers } from 'redux';
import AuthReducer from './auth/auth_reducer'
import PhoneReducer from './auth/phone_reducer'
import CategoryReducer from './menu/category_reducer.js'
import ProductReducer from './menu/product_reducer.js'
import CartReducer from './cart/cart_reducer.js'
import ProfileReducer from './profile/profile_reducer.js'

const rootReducer = combineReducers({
  user: AuthReducer,
  phone: PhoneReducer,
  cart: CartReducer,
  categories: CategoryReducer,
  cart: CartReducer,
  products: ProductReducer,
  profile: ProfileReducer

});

export default rootReducer;
